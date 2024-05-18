import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./AdminManagePartner.css"; // Ensure the CSS file is named correctly
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

function AdminManagePartners() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [actionStatus, setActionStatus] = useState({});
  const [partnerData, setPartnerData] = useState([]);
  const [filteredPartnerData, setFilteredPartnerData] = useState([]);
  const [blank, setRedirectToBlank] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("user_session"));
    if (!userSession || userSession.role !== "Admin") {
      // Set redirectToLogin to true if user role is not admin or if user session is null
      setRedirectToBlank(true);
    } else {
      // Fetch user accounts from backend API when the component mounts
      fetchPartnerAccounts();
    }
  }, [actionStatus]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const regex = new RegExp(searchQuery, "i");
      const filteredPartners = partnerData.filter((partner) =>
        regex.test(partner.name)
      );
      setFilteredPartnerData(filteredPartners);
    } else {
      // If search query is empty, set filtered products to the full list of products
      setFilteredPartnerData(partnerData);
    }
  }, [searchQuery, partnerData]);

  useEffect(() => {
    if (categoryFilter.trim() !== "") {
      const regex = new RegExp(categoryFilter, "i");
      const filteredPartners = partnerData.filter((partner) =>
        regex.test(partner.category)
      );
      setFilteredPartnerData(filteredPartners);
    } else {
      // If category filter is empty, set filtered products to the full list of products
      setFilteredPartnerData(partnerData);
    }
  }, [categoryFilter, partnerData]);

  if (blank) {
    return <Navigate to="/login" />;
  }

  const fetchPartnerAccounts = async () => {
    try {
      const response = await fetch(`${apiUrl}/get_partneraccounts`);
      if (!response.ok) {
        throw new Error("Failed to fetch partner accounts");
      }
      const data = await response.json();
      setPartnerData(data.accounts);
      setFilteredPartnerData(data.accounts); // Set filtered data initially same as partner data
    } catch (error) {
      console.error("Error fetching partner accounts:", error);
    }
  };

  const handleActivate = async (partner) => {
    try {
      const emailString = String(partner.email);
      // console.log(emailString);
      // Make a POST request to update the partner's status
      const response = await fetch(`${apiUrl}/activate_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailString }),
      });

      if (!response.ok) {
        throw new Error("Failed to activate partner");
      }

      // Update the action status in the frontend
      setActionStatus((prevStatus) => ({
        ...prevStatus,
        [partner.email]: "Activated",
      }));
    } catch (error) {
      console.error("Error activating partner:", error.message);
    }
  };

  const handleSuspend = async (partner) => {
    try {
      const emailString = String(partner.email);
      // console.log(emailString);
      // Make a POST request to update the partner's status
      const response = await fetch(`${apiUrl}/suspend_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailString }),
      });

      if (!response.ok) {
        throw new Error("Failed to suspend partner");
      }

      // Update the action status in the frontend
      setActionStatus((prevStatus) => ({
        ...prevStatus,
        [partner.email]: "Suspended",
      }));
    } catch (error) {
      console.error("Error suspending partner:", error.message);
    }
  };

  return (
    <div>
      <AdminSidebarNavbar />
      <div className="partner-management-white-box">
        <hr />
        <div className="partner-management-container">
          <div className="partner-management-header">
            <h1>Blogshop Partners</h1>
            <div className="partner-management-search-container">
              <label htmlFor="blogshop-options">Search Blogshop:</label>
              <input
                type="text"
                id="blogshop-options"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blogshop name:"
                className="search-input"
              />
              <label htmlFor="category-filter">Filter by Category:</label>
              <input
                type="text"
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                placeholder="Search by category:"
                className="search-input"
              />
            </div>
          </div>
          <table className="partner-management-table">
            <thead>
              <tr>
                <th>E-mail</th>
                <th>Blogshop Owner</th>
                <th>UEN Number</th>
                <th>Category</th>
                <th>Link</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPartnerData.map((partner, index) => (
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
                  <td>
                    {partner.suspended == "0" ? "Active" : "Suspended"}
                  </td>
                  <td className="partner-management-action-column">
                    {partner.suspended == "1" && (
                      <button
                        className="admin-activate-partner-button"
                        onClick={() => handleActivate(partner)}
                      >
                        Activate
                      </button>
                    )}
                    {partner.suspended == "0" && (
                      <button
                        className="admin-suspend-partner-button"
                        onClick={() => handleSuspend(partner)}
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

export default AdminManagePartners;
