import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UnregSidebarNavbar from "../UnregSidebarNavbar";
import './Login.css'; // Ensure you have this CSS file with the correct styles
import { Navigate, useNavigate } from 'react-router-dom'; // Import Navigate for redirection
import GeneralFooter from "../GeneralFooter";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const apiUrl = 'http://ec2-13-239-36-228.ap-southeast-2.compute.amazonaws.com';
  
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
  
      const userSession = await response.json(); // Parse JSON response
      localStorage.setItem('user_session', JSON.stringify(userSession)); // Save the user session
      console.log(userSession);
  
      const userRole = userSession.role;
      if (userRole === 'Admin') {
        navigate('/adminmanagepartner');
      } else if (userRole === 'User') {
        navigate('/UserHomepage');
      } else if (userRole === 'Partner') {
        navigate('/partnerallproducts');
      } else {
        window.alert('Invalid username or password!');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in. Please try again later.');
    }
  };
  

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
      <GeneralFooter />
    </div>
  );
};

export default Login;
