import React, { useState, useEffect } from 'react';
import './AdminManageUser.css';
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

function AdminManageUsers() {
  const [user, setUser] = useState([]);
  const [actionStatus, setActionStatus, partnerName] = useState({});

  useEffect(() => {
    // Fetch user accounts from backend API when the component mounts
    fetchUserAccounts();
  }, []);

  const fetchUserAccounts = async () => {
    try {
      const response = await fetch('/get_useraccounts');
      if (!response.ok) {
        throw new Error('Failed to fetch user accounts');
      }
      const data = await response.json();
      setUser(data.accounts);
    } catch (error) {
      console.error('Error fetching user accounts:', error);
    }
  };

  const handleActivate = (partnerName) => {
    console.log("Activate clicked for:", partnerName);
    // Add activate logic here
    setActionStatus((prevStatus) => ({
      ...prevStatus,
      [partnerName]: "Activated", // Update status for the clicked partner
    }));
  };

  const handleSuspend = async (partnerName) => {
    console.log("Suspend clicked for:", partnerName);

    try {
      // Make a PUT request to update the partner's status
      const response = await fetch(`/suspend_partner/${partnerName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "suspended" }),
      });

      if (!response.ok) {
        throw new Error("Failed to suspend partner");
      }

      // Update the action status in the frontend
      setActionStatus((prevStatus) => ({
        ...prevStatus,
        [partnerName]: "Suspended",
      }));

      console.log("Partner suspended successfully");
    } catch (error) {
      console.error("Error suspending partner:", error.message);
    }
  };

  return (
    <div>
      <AdminSidebarNavbar />
      <div className="user-management-white-box">
        <div className="user-management-container">
          <div className="user-management-header">
            <h1>User Accounts</h1>
          </div>
          <table className="user-management-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Country</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.dob}</td>
                  <td>{user.country}</td>
                  <td>{user.phone}</td>
                  <td className="user-management-action-column">
                        {user.suspended === "0" && (
                          <button
                            className="user-activate-partner-button"
                            onClick={() => handleActivate(user.name)}
                          >
                            Activate
                          </button>
                        )}
                        {user.suspended === "1" && (
                          <button
                            className="user-suspend-partner-button"
                            onClick={() => handleSuspend(user.name)}
                          >
                            Suspend
                          </button>
                        )}
                      </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AdminFooter />
      </div>
    </div>
  );
}

export default AdminManageUsers;
