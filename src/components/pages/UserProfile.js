import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import UserSidebarNavbar from "../UserSidebarNavbar";
import UserFooter from "../UserFooter";
import Navbar from "../Navbar";

function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    dob: '',
    email: '',
    phone: '',
    country: ''
  });

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []); // Empty dependency array to run only once

  const fetchUserData = async () => {
    try {
      const response = await fetch('/user');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error('Error fetching user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/user/' + user._id, { // Use user._id to specify the userId
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        console.log('User data updated successfully');
        window.alert("Updated successfully!");
        // Optionally, you can fetch updated user data after the update operation
        // This ensures that the user interface reflects the latest changes
        await fetchUserData();
      } else {
        console.error('Error updating user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div>
      <Navbar />
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
            <input type="date" name="dob" value={user.dob || ""} onChange={handleChange} disabled placeholder="" />
          </label>

          <label>
            Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="" disabled />
          </label>

          <label>
            Phone Number:
            <input type="tel" name="phone" value={user.phone} onChange={handleChange} placeholder="" />
          </label>

          <label>
            Country:
            <select name="country" value={user.country} onChange={handleChange} placeholder="">
              {/* Options would be populated dynamically in a real-world app */}
              <option value="">Select Country</option>
              <option value="sg">Singapore</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Indonesia">Indonesia</option>
            </select>
          </label>

          <button type="submit">Done</button>
        </form>
      </div>
      <UserFooter />
    </div>
    </div>
  );
}

export default UserProfile;
