import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ResetPassword.css';
import GeneralFooter from "../GeneralFooter";
import UnregSidebarNavbar from "../UnregSidebarNavbar";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    setError('');
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
          <input type="hidden" name="token" value={token} />
          <label htmlFor="password">NEW PASSWORD:</label>
          <input
            type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"} {/* Button to toggle password visibility */}
          </button>
          <br /><br />
          <label htmlFor="confirmPassword">CONFIRM NEW PASSWORD:</label>
          <input
            type={showConfirmPassword ? "text" : "password"} // Toggle input type based on showConfirmPassword state
            id="confirmPassword"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? "Hide" : "Show"} {/* Button to toggle confirm password visibility */}
          </button>
          <br /><br />
          <input type="submit" value="Reset Password" />
        </form>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default ResetPassword;
