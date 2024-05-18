import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UnregSidebarNavbar from "../UnregSidebarNavbar";
import "./Login.css"; // Ensure you have this CSS file with the correct styles
import { Navigate, useNavigate } from "react-router-dom"; // Import Navigate for redirection
import GeneralFooter from "../GeneralFooter";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
    // const apiUrl = "http://localhost:8000"; // Local Backend URL

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // If login is successful, redirect to appropriate page
        const userSession = await response.json(); // Parse JSON response
        localStorage.setItem("user_session", JSON.stringify(userSession)); // saves the user current session for further use
        // console.log(userSession);
        const userRole = userSession.role; // Access the role field
        if (userRole === "Admin") {
          navigate("/UnregisteredBlogshopOwner");
        } else if (userRole === "User") {
          navigate("/UserHomepage");
        } else if (userRole === "Partner") {
          navigate("/partnerallproducts");
        }
      } else {
        // If login fails, set error state
        const errorMessage = await response.text();
        window.alert(errorMessage);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred while logging in. Please try again later.");
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
                <input type="submit" value="LOG IN" /> <br />
                <br />
              </form>
              <p>
                Don't Have An Account? <a href="/RegisterRole">Click Here!</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <GeneralFooter />
    </div>
  );
};

export default Login;
