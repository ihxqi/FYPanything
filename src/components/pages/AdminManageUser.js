import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./AdminManageUser.css";
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

function AdminManageUsers() {
  const [user, setUser] = useState([]);
  const [actionStatus, setActionStatus, userName] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUserData, setFilteredUserData] = useState([]);
  const [blank, setRedirectToBlank] = useState(false);

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("user_session"));
    if (!userSession || userSession.role !== "Admin") {
      // Set redirectToLogin to true if user role is not admin or if user session is null
      setRedirectToBlank(true);
    }
    // Fetch user accounts from backend API when the component mounts
    fetchUserAccounts();
  }, [actionStatus]);

  if (blank) {
    return <Navigate to="/login" />;
  }

  const fetchUserAccounts = async () => {
    try {
      const response = await fetch(`${apiUrl}/get_useraccounts`);
      if (!response.ok) {
        throw new Error("Failed to fetch user accounts");
      }
      const data = await response.json();
      setUser(data.accounts);
      //setFilteredUserData(data.accounts);
    } catch (error) {
      console.error("Error fetching user accounts:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value); // Update the search query state as the user types

    // If the search query is empty, fetch all categories
    if (value === "") {
      fetchUserAccounts();
    } else {
      // Otherwise, perform a search with the current search query
      handleSearch();
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    const filteredData = user.filter((partner) =>
      partner.name.toLowerCase().includes(query)
    );
    setUser(filteredData);
  };

  const handleActivate = async (user) => {
    try {
      const emailString = String(user.email);
      // console.log(emailString);
      // Make a PUT request to update the partner's status
      const response = await fetch(`${apiUrl}/activate_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailString }),
      });

      if (!response.ok) {
        throw new Error("Failed to suspend user");
      }

      // Update the action status in the frontend
      setActionStatus((prevStatus) => ({
        ...prevStatus,
        [user.email]: "Suspended",
      }));
    } catch (error) {
      console.error("Error suspending user:", error.message);
    }
    setActionStatus((prevStatus) => ({
      ...prevStatus,
      [user]: "Activated", // Update status for the clicked partner
    }));
  };

  const handleSuspend = async (user) => {
    try {
      const emailString = String(user.email);
      // console.log(emailString);
      // Make a PUT request to update the partner's status
      const response = await fetch(`${apiUrl}/suspend_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailString }),
      });

      if (!response.ok) {
        throw new Error("Failed to suspend user");
      }

      // Update the action status in the frontend
      setActionStatus((prevStatus) => ({
        ...prevStatus,
        [user.email]: "Suspended",
      }));
    } catch (error) {}
  };

  return (
    <div>
      <AdminSidebarNavbar />
      <div className="user-management-container">
        <div className="user-management-header">
          <h1>User Accounts</h1>
          <div className="user-management-search-bar">
            <input
              type="text"
              placeholder="Search by name:"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
        <table className="user-management-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Country</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Action</th>
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
                <td>{user.suspended == "0" ? "Active" : "Suspended"}</td>
                <td className="user-management-action-column">
                  {user.suspended == "1" && (
                    <button
                      className="user-activate-partner-button"
                      onClick={() => handleActivate(user)}
                    >
                      Activate
                    </button>
                  )}
                  {user.suspended == "0" && (
                    <button
                      className="user-suspend-partner-button"
                      onClick={() => handleSuspend(user)}
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
  );
}

export default AdminManageUsers;
