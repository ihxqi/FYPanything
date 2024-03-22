import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from "../Navbar";
import './Login.css'; // Ensure you have this CSS file with the correct styles
import { Navigate, useNavigate } from 'react-router-dom'; // Import Navigate for redirection
import GeneralFooter from "../GeneralFooter";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);
  const [redirectToUser, setRedirectToUser] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Press");
  
    try {
      const response = await fetch('/AuthLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        // If login is successful, redirect to appropriate page
        console.log("Logging in");
        const userRole = await response.text();
        console.log('userRole:', userRole);
        if (userRole === 'admin') {
          console.log("User " + userRole)
          navigate('/Links')
        } else if (userRole === 'user') {
          navigate('/Links')
        }
        else{
          window.alert('Invalid username or password!');
        }
      } else {
        // If login fails, set error state
        window.alert('Invalid username or password');
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
      <Navbar />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <div className="login-container">
              <h1 className="login-header">COLLAFILTER</h1>
              <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">USERNAME:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="password">PASSWORD:</label>
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
