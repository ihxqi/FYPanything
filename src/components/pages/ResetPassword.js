import React, { useState } from 'react';
import './ResetPassword.css'; // Make sure to create and import your CSS file
import GeneralFooter from "../GeneralFooter";
import UnregSidebarNavbar from "../UnregSidebarNavbar";

const ResetPassword = () => {
  const [email, setEmail] = useState('');
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
    console.log(email, password);
    // Send the email and new password to your server for further processing
  };

  return (
    <div>
    <div className="reset-password-container">
        <UnregSidebarNavbar />
      <h1 className="reset-password-header">Reset Your Password</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="reset-password-form" onSubmit={handleSubmit}>
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

