import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './ForgetPassword.css'; // Ensure you have this CSS file with the correct styles
import Navbar from '../Navbar';


const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('/forgetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset password request');
      }

      // Reset the form
      setEmail('');

      console.log('Reset password request sent successfully');
      window.alert("Reset password email sent!")
    } catch (error) {
      console.error('Error sending reset password request:', error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <div className="password-container">
              <h1 className="password-header">COLLAFILTER</h1>
              <form className="password-form" onSubmit={handleSubmit}>
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
