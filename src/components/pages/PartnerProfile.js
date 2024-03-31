import React, { useState, useEffect } from 'react';
import './PartnerProfile.css';
import PartnerSidebarNavbar from "../PartnerSidebarNavbar";
import PartnerFooter from "../PartnerFooter";
import Navbar from "../Navbar";

function PartnerProfile() {
  const [partner, setPartner] = useState({
    name: '',
    doe: '',
    email: '',
    phone: '',
    link: '',
    productType: '',
  });

  useEffect(() => {
    // Fetch partner data when the component mounts
    fetchPartnerData();
  }, []); // Empty dependency array to run only once

  const fetchPartnerData = async () => {
    try {
      const response = await fetch('/user');
      if (response.ok) {
        const partnerData = await response.json();
        setPartner(partnerData);
      } else {
        console.error('Error fetching partner data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching partner data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartner((prevPartner) => ({
      ...prevPartner,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/user/' + partner._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(partner),
      });
      if (response.ok) {
        console.log('Partner data updated successfully');
        window.alert("Updated successfully!");
        await fetchPartnerData();
      } else {
        console.error('Error updating partner data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating partner data:', error);
    }
  };

  return (
    <div>
    <div className="partner-profile-container">
      <PartnerSidebarNavbar />
      <form className="partner-profile-form" onSubmit={handleSubmit}>
        <h1>Partner Profile</h1>
        <label>
  Company Name:
  <input type="text" name="name" value={partner.name || ""} onChange={handleChange} placeholder="" />
</label>

<label>
  Date of Establishment:
  <input type="date" name="dateOfEst" value={partner.doe || ""} onChange={handleChange} placeholder="" />
</label>

<label>
  Email:
  <input type="text" name="email" value={partner.email || ""} onChange={handleChange} disabled placeholder="" />
</label>

<label>
  Phone Number:
  <input type="text" name="phoneNumber" value={partner.phone || ""} onChange={handleChange} placeholder="" />
</label>

<label>
  Social Links:
  <input type="text" name="website" value={partner.link || ""} onChange={handleChange} placeholder="" />
</label>

<label>
  Product Type:
  <input type="text" name="productType" value={partner.productType || ""} onChange={handleChange} placeholder="" />
</label>



        <button type="submit">Done</button>
      </form>
    </div>
    <PartnerFooter />
    </div>
  
  );
  
}

export default PartnerProfile;
