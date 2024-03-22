import React, { useState } from 'react';
import './UserProfile.css';
import UserSidebarNavbar from "../UserSidebarNavbar";

function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submission logic here, for example, send data to a server
    console.log(user);
  };

  return (
    <div>
        <UserSidebarNavbar />
    
    <div className="user-profile-container">
      <form className="user-profile-form" onSubmit={handleSubmit}>
        <h1>Edit User Profile</h1>
        <label>
          Name:
          <input type="text" name="name" value={user.name} onChange={handleChange} />
        </label>


        <label>
          Date of Birth:
          <input type="date" name="dateOfBirth" value={user.dateOfBirth || ""} onChange={handleChange} disabled placeholder="" />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="" />
        </label>

        <label>
          Phone Number:
          <input type="tel" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="" />
        </label>

        <label>
          Country:
          <select name="country" value={user.country} onChange={handleChange} placeholder="">
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
    </div>
  );
}

export default UserProfile;

