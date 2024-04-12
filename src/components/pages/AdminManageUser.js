import React, { useState, useEffect } from 'react';
import './AdminManageUser.css';
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

function AdminManageUsers() {
  const [user, setUser] = useState([]);

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
                <th>Address</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.dob}</td>
                  <td>{user.country}</td>
                  <td>{user.address}</td>
                  <td>{user.phone}</td>
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
