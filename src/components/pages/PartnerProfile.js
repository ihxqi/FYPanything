import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./PartnerProfile.css";
import PartnerSidebarNavbar from "../PartnerSidebarNavbar";
import PartnerFooter from "../PartnerFooter";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

const PartnerProfile = () => {
  const [partner, setPartner] = useState({
    name: "",
    doe: "",
    email: "",
    phone: "",
    link: "",
    UEN: "",
    country: "",
    category: "",
  });
  const [blank, setRedirectToBlank] = useState(false);

  const countryMapping = {
    sg: "Singapore",
    my: "Malaysia",
    ind: "Indonesia",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartner((prevPartner) => ({
      ...prevPartner,
      [name]: value,
    }));
  };

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("user_session"));
    if (!userSession || userSession.role !== "Partner") {
      // Set redirectToLogin to true if user role is not admin or if user session is null
      setRedirectToBlank(true);
    }
    fetchUserAccount();
  }, []);

  const fetchUserAccount = async () => {
    try {
      // Retrieve the user's email from localStorage
      const session = localStorage.getItem("user_session");
      const userSession = JSON.parse(session);
      const userEmail = userSession.email;
      console.log(userEmail);
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
      setPartner({
        name: userAccount.name || "",
        doe: userAccount.doe || "",
        email: userAccount.email || "",
        phone: userAccount.phone || "",
        country: userAccount.country || "",
        UEN: userAccount.UEN || "",
        link: userAccount.link || "",
        category: userAccount.category || "",
        // Set other fields similarly
      });
    } catch (error) {
      console.error("Error fetching user account:", error);
    }
  };

  if (blank) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Send INFO " + JSON.stringify(partner));

    try {
      const response = await fetch(`${apiUrl}/update_partner_data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partner),
      });

      const responseData = await response.json();

      if (response.ok) {
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
      <div className="partner-profile-container">
        <PartnerSidebarNavbar />
        <form className="partner-profile-form" onSubmit={handleSubmit}>
          <h1>Partner's Profile</h1>
          <label>
            Blogshop Name:
            <input
              type="text"
              name="name"
              value={partner.name || ""}
              onChange={handleChange}
              disabled
              placeholder=""
            />
          </label>

          <label>
            Date of Establishment:
            <input
              type="date"
              name="doe"
              value={partner.doe || ""}
              onChange={handleChange}
              disabled
              placeholder=""
            />
          </label>

          <label>
            Blogshop Email:
            <input
              type="text"
              name="email"
              value={partner.email || ""}
              onChange={handleChange}
              disabled
              placeholder=""
            />
          </label>

          <label>
            Phone Number:
            <input
              type="text"
              name="phone"
              value={partner.phone || ""}
              onChange={handleChange}
              placeholder=""
            />
          </label>

          <label>
            UEN Number:
            <input
              type="text"
              name="UEN"
              value={partner.UEN || ""}
              onChange={handleChange}
              disabled
              placeholder=""
            />
          </label>

          <label>
            Social Links:
            <input
              type="text"
              name="link"
              value={partner.link || ""}
              onChange={handleChange}
              disabled
              placeholder=""
            />
          </label>

          <label>
            Product Type:
            <input
              type="text"
              name="category"
              value={partner.category || ""}
              onChange={handleChange}
              disabled
              placeholder=""
            />
          </label>

          <label>
            Country:
            <input
              type="text"
              name="category"
              value={countryMapping[partner.country]}
              onChange={handleChange}
              disabled
              placeholder=""
            />
          </label>

          <button type="submit">Done</button>
        </form>
      </div>
      <PartnerFooter />
    </div>
  );
};

export default PartnerProfile;
