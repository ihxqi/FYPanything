import React, { useState } from 'react';
import './PartnerProfile.css';
import PartnerSidebarNavbar from "../PartnerSidebarNavbar";
import PartnerFooter from "../PartnerFooter";

const PartnerProfile = () => {
  const [partner, setPartner] = useState({
    companyname: '',
    dateOfEst: '',
    email: '',
    phoneNumber: '',
    website: '',
    productType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartner((prevPartner) => ({
      ...prevPartner,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submission logic here, for example, send data to a server
    console.log(partner);
  };

  return (
    <div>
    <div className="partner-profile-container">
      <PartnerSidebarNavbar />
      <form className="partner-profile-form" onSubmit={handleSubmit}>
        <h1>Partner Profile</h1>
        <label>
  Blogshop Name:
  <input type="text" name="name" value={partner.companyName || ""} onChange={handleChange} disabled placeholder="" />
</label>

<label>
  Date of Establishment:
  <input type="date" name="dateOfEst" value={partner.dateOfEst || ""} onChange={handleChange} disabled placeholder="" />
</label>

<label>
  Blogshop Email:
  <input type="text" name="email" value={partner.email || ""} onChange={handleChange} disabled placeholder="" />
</label>

<label>
  Phone Number:
  <input type="text" name="phoneNumber" value={partner.phoneNumber || ""} onChange={handleChange} placeholder="" />
</label>

<label>
  UEN Number:
  <input type="text" name="uenNumber" value={partner.uenNumber || ""} onChange={handleChange} disabled placeholder="" />
</label>

<label>
  Social Links:
  <input type="text" name="website" value={partner.website || ""} onChange={handleChange} disabled placeholder="" />
</label>

<label>
  Product Type:
  <input type="text" name="productType" value={partner.productType || ""} onChange={handleChange} disabled placeholder="" />
</label>

<label>
            Country:
            <select name="partnercountry" value={partner.country} onChange={handleChange} disabled placeholder="">
              {/* Options would be populated dynamically in a real-world app */}
              <option value="">Select Country</option>
              <option value="Singapore">Singapore</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Indonesia">Indonesia</option>
            </select>
</label>



        <button type="submit">Done</button>
      </form>
    </div>
    <PartnerFooter />
    </div>
  
  );
  
}

export default PartnerProfile;
