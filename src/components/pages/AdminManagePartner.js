import React, { useState, useEffect } from 'react';
import './AdminManagePartner.css'; // Ensure the CSS file is named correctly
import Select from 'react-select'; // Import React-Select
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

function AdminManagePartners() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [categories, setCategories] = useState([]);
  const [actionStatus, setActionStatus] = useState({}); // State to hold individual statuses
  const [partnerData, setPartner] = useState([]);
  const [filteredPartnerData, setFilteredPartnerData] = useState(partnerData);
  const [selectedCategory, setSelectedCategory] = useState(null);


  useEffect(() => {
    fetchPartnerAccounts();
  }, []);

  useEffect(() => {
    fetchCategories(); 
  }, []);

  const fetchPartnerAccounts = async () => {
    try {
      const response = await fetch('/get_partneraccounts');
      if (!response.ok) {
        throw new Error('Failed to fetch partner accounts');
      }
      const data = await response.json();
      const filteredData = data.accounts.filter(partner => partner.authentication === '1');
      setPartner(filteredData);
    } catch (error) {
      console.error('Error fetching partner accounts:', error);
    }
    
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch('/get_categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      // Extract only the category names from the response
      const categoriesArray = Object.keys(data.categories);
      setCategories(categoriesArray);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };
  
  

  // Define your options for the dropdown
  const blogshopOptions = partnerData.map(partner => ({
    value: partner.name,
    label: partner.name
  }));

 // const categoriesOptions = categories.map(category => ({
   // value: category, 
  //  label: category 
 // }));
  
 // console.log("Categories Options:", categoriesOptions);
  

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
    if (selectedCategory) {
      const selectedCategoryValue = selectedCategory.value;
      const filteredPartners = partnerData.filter(partner => partner.category === selectedCategoryValue);
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
                  <Select
                id="categories-filter"
                options={blogshopOptions}
                value={selectedCategory}
                onChange={(selectedOption) => setSelectedCategory(selectedOption ? selectedOption.value : null)}
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
                <th>UEN Number</th>
                <th>Category</th>
                <th>Social Links</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {selectedOption || selectedCategory ? (
              // If any filter is applied, render filteredPartnerData
              filteredPartnerData.map((partner, index) => (
                <tr key={index}>
                  <td>{partner.name}</td>
                  <td>{partner.UEN}</td>
                  <td>{partner.category}</td>
                  <td>{partner.link}</td>
                  <td>{actionStatus[partner.name]}</td>
                  <td className="partner-management-action-column">
                  <button className="admin-activate-partner-button" onClick={() => handleActivate(partner.name)}>Activate</button>
                  <button className="admin-suspend-partner-button" onClick={() => handleSuspend(partner.name)}>Suspend</button>
                  </td>
                </tr>
              ))
            ) : (
              // If no filter is applied, render partnerData
              partnerData.map((partner, index) => (
                <tr key={index}>
                  <td>{partner.name}</td>
                  <td>{partner.UEN}</td>
                  <td>{partner.category}</td>
                  <td>{partner.link}</td>
                  <td>{actionStatus[partner.name]}</td>
                  <td className="partner-management-action-column">
                    <button className="admin-activate-partner-button" onClick={() => handleActivate(partner.name)}>Activate</button>
                    <button className="admin-suspend-partner-button" onClick={() => handleSuspend(partner.name)}>Suspend</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

          </table>
        </div>
        <AdminFooter />
      </div>
    </div>
  );
}

export default AdminManagePartners;
