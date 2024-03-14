import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from "../Navbar";
import './ForgetEmail.css'; // Ensure you have this CSS file with the correct styles

const ForgetEmail = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle your form submission logic here
    console.log(username, password, cPassword);
    // For example, send username and password to your server
  };

  return (
    <div>
      <Navbar/>
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

                <label htmlFor="cpassword">CONFIRM PASSWORD:</label>
              <input
               type="password"  // This should be "password"
               id="cpassword"
              name="cpassword"
              required
              value={cPassword}  // The state variable should be camelCase: "cPassword"
              onChange={(e) => setCPassword(e.target.value)}  // And the handler should be "setCPassword"
              />
              

              <input type="submit" value="Submit" />
            </form>
            <p>Forget Password? <a href="#">Click Here!</a></p>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
};
export default ForgetEmail;
