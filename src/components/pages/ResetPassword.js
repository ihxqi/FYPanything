import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to extract parameters from the URL
import './ResetPassword.css';
import GeneralFooter from "../GeneralFooter";
import UnregSidebarNavbar from "../UnregSidebarNavbar";

const ResetPassword = () => {
  const { token } = useParams(); // Extract the token from the URL parameters
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    // Clear error if any
    setError('');

    // Handle the reset password logic here
    console.log(token, password);
    // Send the token, email, and new password to your server for further processing
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
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
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
