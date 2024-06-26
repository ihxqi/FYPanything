import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./ForgetPassword.css"; // Ensure you have this CSS file with the correct styles
import Navbar from "../Navbar";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/forgetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      // console.log("Enter: forgetpassword fetch function");
      if (response.ok) {
        // Reset the form
        setEmail("");
        window.alert("Reset password email sent!");
      } else if (response.status === 400) {
        window.alert("Forget password email already sent");
      } else if (response.status === 404) {
        window.alert("Email does not exist");
      } else {
        throw new Error("Failed to send reset password request");
      }
    } catch (error) {
      console.error("Error sending reset password request:", error);
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
