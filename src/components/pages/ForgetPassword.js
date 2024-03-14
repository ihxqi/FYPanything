import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './ForgetPassword.css'; // Ensure you have this CSS file with the correct styles
import Navbar from '../Navbar';

const ForgetPassword = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle your form submission logic here
    console.log(username, email);
    // For example, send username and password to your server
  };

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

              <label htmlFor="email">EMAIL:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <input type="submit" value="Submit" />
            </form>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
};
export default ForgetPassword;