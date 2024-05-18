import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import GeneralFooter from "../GeneralFooter";
import "./VerifyEmail.css";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

const VerifyEmail = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const { token } = useParams();

  useEffect(() => {
    // Call your backend API to check if the account is authenticated
    // Replace the placeholder URL with your actual backend API endpoint
    fetch(`${apiUrl}/verifyemail/${token}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the backend API response contains a boolean value indicating whether the account is authenticated
        setIsAuthenticated(data.authenticated);
        setLoading(false); // Update loading state after fetch completes
      })
      .catch((error) => {
        // console.error("Error:", error);
        setLoading(false); // Update loading state after fetch completes
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="verify-email-container">
        {loading ? ( // Display loading message while waiting for fetch to complete
          <p>Checking account authentication...</p>
        ) : (
          <>
            {isAuthenticated ? (
              <div>
                <p>Your account has been successfully authenticated!</p>
                <p>
                  <Link to="/login">Click here to login.</Link>
                </p>
              </div>
            ) : (
              <p>Account authentication failed. Please try again later.</p>
            )}
          </>
        )}
      </div>
      <GeneralFooter /> {/* Assuming you have a footer component */}
    </div>
  );
};

export default VerifyEmail;
