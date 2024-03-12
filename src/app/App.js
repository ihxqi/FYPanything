import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "../components/Navbar"; // Update the path if necessary
//import ContactUs from "../contact/index";
import { AboutUs, Home, Information, Login } from "../components/pages";
import { Roles } from "../components/pages";
import PartnerRegistrationForm from "../components/partners/PartnerRegistrationForm";
import UserRegistrationForm from "../components/users/UserRegistrationForm";


export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/information" element={<Information />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/roles" element={<Roles />} />
          <Route path="/register/partner" component={PartnerRegistrationForm} />
          <Route path="/register/user" component={UserRegistrationForm} />
        </Routes>
      </div>
    </Router>
  );
}
