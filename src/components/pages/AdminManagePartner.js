import React, { useState, useEffect } from "react";
import "./AdminManagePartner.css"; // Ensure the CSS file is named correctly
import Select from "react-select"; // Import React-Select
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

function AdminManagePartners() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [actionStatus, setActionStatus, partnerName] = useState({});
  const [partnerData, setPartnerData] = useState([]);
  const [filteredPartnerData, setFilteredPartnerData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch user accounts from backend API when the component mounts
    fetchPartnerAccounts();
  }, [actionStatus]);

  const fetchPartnerAccounts = async () => {
    try {
      const response = await fetch("/get_partneraccounts");
      if (!response.ok) {
        throw new Error("Failed to fetch partner accounts");
      }
      const data = await response.json();
      setPartnerData(data.accounts);
      setFilteredPartnerData(data.accounts); // Set filtered data initially same as partner data

      // Extract unique categories from partnerData and set as categoryOptions
      const uniqueCategories = [
        ...new Set(data.accounts.map((partner) => partner.category)),
      ];
      setCategoryOptions(
        uniqueCategories.map((category) => ({
          value: category,
          label: category,
        }))
      );
    } catch (error) {
      console.error("Error fetching partner accounts:", error);
    }
  };

  // Define your options for the dropdown
  const blogshopOptions = partnerData.map((partner) => ({
    value: partner.name,
    label: partner.name,
  }));

  const handleSearch = () => {
    if (selectedOption) {
      const selectedBlogshop = selectedOption.label;
      const filteredPartners = partnerData.filter(
        (partner) => partner.name === selectedBlogshop
      );
      setFilteredPartnerData(filteredPartners);
      console.log("Filtered partners:", filteredPartners);
    } else {
      setFilteredPartnerData(partnerData);
      console.log("No option selected");
    }
  };

  const handleFilter = () => {
    if (categoryFilter) {
      const selectedCategoryValue = categoryFilter.value;
      const filteredPartners = partnerData.filter(
        (partner) => partner.category === selectedCategoryValue
      );
      setFilteredPartnerData(filteredPartners);
      console.log("Filtered partners by category:", filteredPartners);
    } else {
      setFilteredPartnerData([...partnerData]); // Create a copy of partnerData
      console.log("No category selected");
    }
  };

  const handleActivate = async (partner) => {
    console.log("Activate clicked for:", partner.email);
    // Add activate logic here
    try {
      const emailString = String(partner.email);
      console.log(emailString);
      // Make a PUT request to update the partner's status
      const response = await fetch(`/activate_user`, {
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

      console.log("Partner suspended successfully");
    } catch (error) {
      console.error("Error suspending partner:", error.message);
    }
    setActionStatus((prevStatus) => ({
      ...prevStatus,
      [partnerName]: "Activated", // Update status for the clicked partner
    }));
  };

  const handleSuspend = async (partner) => {
    console.log("Suspend clicked for:", partner.email);
    try {
      const emailString = String(partner.email);
      console.log(emailString);
      // Make a PUT request to update the partner's status
      const response = await fetch(`/suspend_user`, {
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

      console.log("Partner suspended successfully");
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
              <Select
                id="blogshop-options"
                options={blogshopOptions}
                value={selectedOption}
                onChange={setSelectedOption}
                placeholder="Select a blogshop..."
                isSearchable={true}
              />
              <label htmlFor="category-filter">Filter by Category:</label>
              <Select
                id="category-filter"
                options={categoryOptions}
                value={categoryFilter}
                onChange={setCategoryFilter}
                placeholder="Select a category..."
                isSearchable={false}
              />

              <button
                className="partner-management-search-bar-button"
                onClick={handleSearch}
              >
                Search
              </button>
              <button
                className="partner-management-filter-bar-button"
                onClick={handleFilter}
              >
                Filter
              </button>
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
              {selectedOption || categoryFilter
                ? // If any filter is applied, render filteredPartnerData
                  filteredPartnerData.map((partner, index) => (
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
                  ))
                : // If no filter is applied, render partnerData
                  partnerData.map((partner, index) => (
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
