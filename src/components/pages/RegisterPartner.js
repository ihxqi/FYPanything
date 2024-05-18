import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPartner.css";
import Navbar from "../Navbar";
import GeneralFooter from "../GeneralFooter";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

const RegisterPartner = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [doe, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [link, setSocialLinks] = useState("");
  const [UEN, setUENNumber] = useState("");
  const [categories, setCatOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleRegister = async () => {
    try {
      const response = await fetch(`${apiUrl}/registerpartner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          UEN,
          phone,
          doe,
          category,
          link,
          country,
        }),
      });

      if (response.ok) {
        const successMessage = await response.text();
        window.alert(successMessage);
        navigate("/login");
        // Handle success (e.g., show a success message, redirect, etc.)
      } else {
        console.error("Failed to register partner");
        const errorMessage = await response.text();
        window.alert(errorMessage);
      }
    } catch (error) {
      console.error("Error registering partner:", error);
      // Handle network error or other exceptions
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/get_categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      // console.log(data);
      const categories = Object.keys(data.categories).map((category) => ({
        value: category,
        label: category,
      }));
      setCatOptions(categories);
      // setSelectedCategory(categories[0]); // Commented out to prevent default selection
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="Partnerregistration-container">
        <div className="Partnerheader">
          <h2>Partner Registration</h2>
        </div>
      </div>

      <div className="Partnerform-container">
        <div className="Partnerlabel-input-container">
          <span className="Partnerlabel">Blogshop Name:</span>
          <input
            className="Partnerinput-field"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="Partnerlabel-input-container">
          <span className="Partnerlabel">Date of establishment:</span>
          <input
            className="Partnerinput-field"
            type="date"
            value={doe}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>

        <div className="Partnerlabel-input-container">
          <span className="Partnerlabel">Blogshop Email:</span>
          <input
            className="Partnerinput-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="Partnerlabel-input-container">
          <span className="Partnerlabel">Password:</span>
          <input
            className="Partnerinput-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="Partnerlabel-input-container">
          <span className="Partnerlabel">Phone Number:</span>
          <input
            className="Partnerinput-field"
            type="tel"
            pattern="\d{8}"
            value={phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="Partnerlabel-input-container">
          <span className="Partnerlabel">UEN Number:</span>
          <input
            className="Partnerinput-field"
            type="text"
            pattern="[0-9A-Z]{10}"
            title="UEN Number must be 10 characters long and contain only numbers and uppercase letters"
            value={UEN}
            onChange={(e) => setUENNumber(e.target.value)}
            required
          />
        </div>

        <div className="Partnerlabel-input-container">
          <span className="Partnerlabel">Category:</span>
          <select
            className="Partnerinput-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Product Type
            </option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="Partnerlabel-input-container">
          <span className="Partnerlabel">Social Links:</span>
          <input
            className="Partnerinput-field"
            type="url"
            value={link}
            onChange={(e) => setSocialLinks(e.target.value)}
            required
          />
        </div>

        <div className="Partnerlabel-input-container">
          <span className="Partnerlabel">Country:</span>
          <select
            className="Partnerinput-field"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            <option value="sg">Singapore</option>
            <option value="my">Malaysia</option>
            {/* Add more countries as needed */}
          </select>
        </div>
        <button className="Partnerbutton" onClick={handleRegister}>
          Register
        </button>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default RegisterPartner;
