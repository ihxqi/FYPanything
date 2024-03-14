import React, { useState } from 'react';
import './PartnerProfile.css';

function PartnerProfile() {
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
    <div className="partner-profile-container">
      <form className="partner-profile-form" onSubmit={handleSubmit}>
        <h1>Partner Profile</h1>
        <label>
          Company Name:
          <input type="text" name="name" value={partner.companyname} onChange={handleChange} />
        </label>

        <label>
          Date of Establishment:
          <input type="date" name="dateOfBirth" value={partner.dateOfEst} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="text" name="email" value={partner.email} onChange={handleChange} />
        </label>

        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={partner.phoneNumber} onChange={handleChange} />
        </label>

        <label>
          Company Website:
          <input type="text" name="website" value={partner.website} onChange={handleChange} />
        </label>

        <label>
          Product Type:
          <input type="text" name="website" value={partner.productType} onChange={handleChange} />
        </label>


        <button type="submit">Done</button>
      </form>
    </div>
  );
}

export default PartnerProfile;
