import React, { useState } from 'react';
import './AdminManagePartner.css'; // Ensure the CSS file is named correctly
import Select from 'react-select'; // Import React-Select
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

function AdminManagePartners() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [actionStatus, setActionStatus] = useState({}); // State to hold individual statuses
  const [partnerData] = useState([
    { name: 'Example Partner', url: 'example.com', uen: 'xxx', category: 'Fashion' },
    { name: 'Ali Partner', url: 'ali.com', uen: 'xxx', category: 'Fashion' },
    { name: 'dear lyla', url: 'dearlyla.com', uen: 'xxx', category: 'Clothes' }
  ]);
  const [filteredPartnerData, setFilteredPartnerData] = useState(partnerData);

  // Define your options for the dropdown
  const blogshopOptions = [
    { value: 'bf blogshop', label: 'bf blogshop' },
    { value: 'dear lyla', label: 'dear lyla' },
    { value: 'carpe diem', label: 'carpe diem' }
  ];
  const categoryOptions = [
    { value: 'Clothes', label: 'Clothes' },
    { value: 'Shoes', label: 'Shoes' },
    { value: 'Accessories', label: 'Accessories' }
  ];

  const handleSearch = () => {
    if (selectedOption) {
      const selectedBlogshop = selectedOption.label;
      const filteredPartners = partnerData.filter(partner => partner.name === selectedBlogshop);
      setFilteredPartnerData(filteredPartners);
      console.log('Filtered partners:', filteredPartners);
    } else {
      setFilteredPartnerData(partnerData);
      console.log('No option selected');
    }
  };

  const handleFilter = () => {
    if (categoryFilter) {
      const selectedCategory = categoryFilter.value;
      const filteredPartners = partnerData.filter(partner => partner.category === selectedCategory);
      setFilteredPartnerData(filteredPartners);
      console.log('Filtered partners by category:', filteredPartners);
    } else {
      setFilteredPartnerData(partnerData);
      console.log('No category selected');
    }
  };

  const handleActivate = (partnerName) => {
    console.log("Activate clicked for:", partnerName);
    // Add activate logic here
    setActionStatus(prevStatus => ({
      ...prevStatus,
      [partnerName]: "Activated" // Update status for the clicked partner
    }));
  };

  const handleSuspend = (partnerName) => {
    console.log("Suspend clicked for:", partnerName);
    // Add suspend logic here
    setActionStatus(prevStatus => ({
      ...prevStatus,
      [partnerName]: "Suspended" // Update status for the clicked partner
    }));
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
              <button className="partner-management-search-bar-button" onClick={handleSearch}>Search</button>
              <button className="partner-management-filter-bar-button" onClick={handleFilter}>Filter</button>
            </div>
          </div>
          <table className="partner-management-table">
            <thead>
              <tr>
                <th>Blogshop Owner</th>
                <th>URL</th>
                <th>UEN Number</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPartnerData.map((partner, index) => (
                <tr key={index}>
                  <td>{partner.name}</td>
                  <td>{partner.url}</td>
                  <td>{partner.uen}</td>
                  <td>{partner.category}</td>
                  <td>{actionStatus[partner.name]}</td>
                  <td className="partner-management-action-column">
                    <button className="admin-activate-partner-button" onClick={() => handleActivate(partner.name)}>Activate</button>
                    <button className="admin-suspend-partner-button" onClick={() => handleSuspend(partner.name)}>Suspend</button>
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
