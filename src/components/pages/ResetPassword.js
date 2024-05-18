import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams to extract parameters from the URL
import "./ResetPassword.css";
import GeneralFooter from "../GeneralFooter";
import UnregSidebarNavbar from "../UnregSidebarNavbar";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

const ResetPassword = () => {
  const { token } = useParams(); // Extract the token from the URL parameters
  const [newpassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`${apiUrl}/verifytoken/${token}`);
        const data = await response.json();
        if (!data.valid) {
          navigate("/login"); // Redirect to login page if token is invalid
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        navigate("/login"); // Redirect to login page if error occurs
      }
    };

    verifyToken();
  }, [token, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newpassword !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setError("");
    // console.log(token);
    // console.log(newpassword);
    try {
      const response = await fetch(`${apiUrl}/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newpassword }), // Send token and password in the request body
      });

      if (!response.ok) {
        // Handle error response from the server
        throw new Error("Failed to reset password");
      }

      // Reset password successfully
      window.alert("Password reset!");
      navigate("/login");
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error resetting password:", error.message);
    }
  };

  return (
    <div>
      <div className="reset-password-container">
        <UnregSidebarNavbar />
        <h1 className="reset-password-header">Reset Your Password</h1>
        {error && <p className="error-message">{error}</p>}
        <form className="reset-password-form" onSubmit={handleSubmit}>
          {/* Add a hidden input field to store the token */}
          <input type="hidden" name="token" value={token} />
          <label htmlFor="password">NEW PASSWORD:</label>
          <input
            type="password"
            id="newpassword"
            name="newpassword"
            required
            value={newpassword}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="confirmPassword">CONFIRM NEW PASSWORD:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input type="submit" value="Reset Password" />
        </form>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default ResetPassword;
