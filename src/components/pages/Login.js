import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from "../Navbar";
import './Login.css'; // Ensure you have this CSS file with the correct styles
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);
  const [redirectToUser, setRedirectToUser] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Static login details for demonstration
    const AUsername = 'Admin';
    const APassword = 'Admin';
    const UUsername = 'User';
    const UPassword = 'User';

    // Check if username and password match static login details
    if (username === AUsername && password === APassword) {
      // If successful, set redirectToRegisterRole to true
      setRedirectToAdmin(true);
    }
    else if (username === UUsername && password === UPassword) {
      // If successful, set redirectToRegisterRole to true
      setRedirectToUser(true);
    }
     else {
      // If login fails, you can display an error message or handle it as you wish
      console.log('Login failed. Invalid credentials.');
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
              <p>Don't Have An Account? <a href="#">Click Here!</a></p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
