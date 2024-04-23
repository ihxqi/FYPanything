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

  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // If login is successful, redirect to appropriate page
      const userSession = await response.json(); // Parse JSON response
      localStorage.setItem('user_session', JSON.stringify(userSession)); // saves the user current session for further use
      console.log(userSession)
      const userRole = userSession.role; // Access the role field
      if (userRole === 'Admin') {
        navigate('/adminmanagepartner')
      } else if (userRole === 'User') {
        navigate('/UserHomepage')
      }
      else if (userRole === 'Partner') {
        navigate('/partnerallproducts')
      }
      else{
        window.alert('Invalid username or password!');
      }
    } else {
      // If login fails, set error state
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
                <a href="/ForgetPassword">Forgot Password? Click here</a>

                <input type="submit" value="LOG IN" /> <br /><br />
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
