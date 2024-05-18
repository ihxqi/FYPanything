import React, { useState, useEffect } from "react";
import "./UnregisteredBlogshopOwner.css"; // Ensure you have this CSS file with the correct styles
import Select from "react-select"; // Import React-Select
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";
import { Navigate } from "react-router-dom";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

function UnregisteredBlogshopOwner() {
  const [actionStatus, setActionStatus, partnerName] = useState({});
  const [partnerData, setPartnerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [blank, setRedirectToBlank] = useState(false);
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    // Check user role when the component mounts
    const userSession = JSON.parse(localStorage.getItem("user_session"));
    if (!userSession || userSession.role !== "Admin") {
      // Set redirectToLogin to true if user role is not admin or if user session is null
      setRedirectToBlank(true);
    } else {
      // Fetch user accounts from backend API if user role is admin
      fetchPartnerAccounts();
    }
  }, [actionStatus]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  if (blank) {
    return <Navigate to="/login" />;
  }

  const fetchPartnerAccounts = async () => {
    try {
      const response = await fetch(`${apiUrl}/get_unregpartneraccounts`);
      if (!response.ok) {
        throw new Error("Failed to fetch unregistered partners");
      }
      const data = await response.json();
      setPartnerData(data.accounts);
    } catch (error) {
      console.error("Error fetching unregistered partners:", error);
    }
  };

  const handleAuthenticate = async (partner) => {
    // Add activate logic here
    try {
      const emailString = String(partner.email);
      // console.log(emailString);
      // Make a PUT request to update the partner's status
      const response = await fetch(`${apiUrl}/authenticate_partner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailString }),
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate partner");
      }

      // Update the action status in the frontend
      setActionStatus((prevStatus) => ({
        ...prevStatus,
        [partner.email]: "authenticate",
      }));
      window.alert("Approved");
      fetchPartnerAccounts();
    } catch (error) {
      console.error("Error authenticating partner:", error.message);
    }
    setActionStatus((prevStatus) => ({
      ...prevStatus,
      [partnerName]: "Activated", // Update status for the clicked partner
    }));
  };

  const handleReject = async (partner) => {
    try {
      const emailString = String(partner.email);
      // console.log(emailString);
      // Make a PUT request to update the partner's status
      const response = await fetch(`${apiUrl}/reject_partner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailString }),
      });

      if (!response.ok) {
        throw new Error("Failed to reject partner");
      }

      // Update the action status in the frontend
      setActionStatus((prevStatus) => ({
        ...prevStatus,
        [partner.email]: "Rejected",
      }));
      window.alert("Rejected");
      fetchPartnerAccounts();
    } catch (error) {
      console.error("Error rejecting partner:", error.message);
    }
  };

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value); // Update the search query state as the user types

    // If the search query is empty, fetch all categories
    if (value === "") {
      fetchPartnerAccounts();
    } else {
      // Otherwise, perform a search with the current search query
      handleSearch();
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    const filteredData = partnerData.filter((partner) =>
      partner.name.toLowerCase().includes(query)
    );
    setPartnerData(filteredData);
  };

  return (
    <div>
      <AdminSidebarNavbar />
      <div className="CM-white-box">
        <hr />
        <div className="CMcontainer">
          <div className="CMheader">
            <h2>Unregistered Blogshop Owners</h2>
          </div>
          <div className="CM-search-bar">
            <input
              type="text"
              placeholder="Search by name:"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
          <table className="CMtable" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>E-mail</th>
                <th>Blogshop Name</th>
                <th>UEN Number</th>
                <th>Category</th>
                <th>Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {partnerData.map((partner, index) => (
                <tr key={index}>
                  <td>{partner.email}</td>
                  <td>{partner.name}</td>
                  <td>{partner.UEN}</td>
                  <td>{partner.category}</td>
                  <td>
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {partner.link}
                    </a>
                  </td>
                  <td className="CMtable-action-column">
                    <button
                      className="admin-approve-partner-button"
                      onClick={() => handleAuthenticate(partner)}
                    >
                      Approve
                    </button>
                    <button
                      className="admin-suspend-partner-button"
                      onClick={() => handleReject(partner)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}

export default UnregisteredBlogshopOwner;
