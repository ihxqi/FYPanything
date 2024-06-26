import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./UserProfile.css";
import UserSidebarNavbar from "../UserSidebarNavbar";
import UserFooter from "../UserFooter";
import Navbar from "../Navbar";
import Select from "react-select"; // Import React-Select here

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    dob: "",
    email: "",
    phone: "",
    country: "",
    blogshops: [],
    budget: 50,
  });
  const [blank, setRedirectToBlank] = useState(false);

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("user_session"));
    if (!userSession || userSession.role !== "User") {
      // Set redirectToLogin to true if user role is not admin or if user session is null
      setRedirectToBlank(true);
    }
    fetchUserAccount();
  }, []);

  if (blank) {
    return <Navigate to="/login" />;
  }

  const fetchUserAccount = async () => {
    try {
      // Retrieve the user's email from localStorage
      const session = localStorage.getItem("user_session");
      const userSession = JSON.parse(session);
      const userEmail = userSession.email;
      if (!userEmail) {
        throw new Error("User email not found in localStorage");
      }

      const response = await fetch(`${apiUrl}/get_userdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user account");
      }

      const userData = await response.json();
      const userAccount = userData.accounts;
      setUser({
        name: userAccount.name || "",
        dob: userAccount.dob || "",
        email: userAccount.email || "",
        phone: userAccount.phone || "",
        country: userAccount.country || "",
        blogshops: userAccount.blogshops || [],
        // Set other fields similarly
      });
    } catch (error) {
      console.error("Error fetching user account:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleBlogshopChange = (selectedOptions) => {
    setUser((prevUser) => ({
      ...prevUser,
      blogshops: selectedOptions,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Sending info: ", user);

    try {
      const response = await fetch(`${apiUrl}/update_user_data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData.message);
        window.alert(responseData.message);

        // Optionally, fetch updated user data after the update operation
        // This ensures that the user interface reflects the latest changes
        await fetchUserAccount();
      } else {
        console.error("Error updating user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <UserSidebarNavbar />
        <div className="user-profile-container">
          {Object.keys(user).length !== 0 && (
            <form className="user-profile-form" onSubmit={handleSubmit}>
              <h1>User's Profile</h1>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Date of Birth:
                <input
                  type="date"
                  name="dob"
                  value={user.dob || ""}
                  onChange={handleChange}
                  disabled
                  placeholder=""
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder=""
                  disabled
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  placeholder=""
                />
              </label>
              <label>
                Country:
                <select
                  name="country"
                  value={user.country}
                  onChange={handleChange}
                  placeholder=""
                >
                  <option value="">Select Country</option>
                  <option value="sg">Singapore</option>
                  <option value="my">Malaysia</option>
                </select>
              </label>
              <button type="submit">Done</button>
            </form>
          )}
        </div>
        <UserFooter />
      </div>
    </div>
  );
}

export default UserProfile;
