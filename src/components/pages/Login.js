import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UnregSidebarNavbar from "../UnregSidebarNavbar";
import './Login.css'; // Ensure you have this CSS file with the correct styles
import { Navigate, useNavigate } from 'react-router-dom'; // Import Navigate for redirection
import GeneralFooter from "../GeneralFooter";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);
  const [redirectToUser, setRedirectToUser] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Press");
    console.log(password) //check
  
    try {
      console.log("Press1");
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        // If login is successful, redirect to appropriate page
      console.log("Logging in");
      const userRole = await response.text();
      console.log('userRole:', userRole);
      if (userRole === 'admin') {
        console.log("User " + userRole)
        navigate('/adminmanagepartner')
      } else if (userRole === 'user') {
        navigate('/UserHomepage')
      }
      else if (userRole === 'partner') {
        navigate('/partnerallproducts')
      }
      else{
        window.alert('Invalid username or password!');
      }
    } else {
      // If login fails, set error state
      console.log("Press2");
      const errorMessage = await response.text();
      window.alert(errorMessage);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    setError('An error occurred while logging in. Please try again later.');
  }
};
  

  // If redirectToRegisterRole is true, redirect to /registerrole
  if (redirectToAdmin) {
    return <Navigate to="/registerrole" />;
  }
  if (redirectToUser) {
    return <Navigate to="/AboutUs" />;
  }

  return (
    <div>
      <UnregSidebarNavbar />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <div className="login-container">
              <h1 className="login-header">COLLAFILTER</h1>
              <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <a href="/ForgetEmail">Forgot Email? Click here</a><br />
                <a href="/ForgetPassword">Forgot Password? Click here</a>

                <input type="submit" value="LOG IN" />
              </form>
              <p>Don't Have An Account? <a href="/RegisterRole">Click Here!</a></p>
            </div>
          </Col>
        </Row>
      </Container>
      <GeneralFooter/>
    </div>
  );
};

export default Login;
