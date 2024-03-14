import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AboutUs, Home, JoinUs, Login, RegisterRole, RegisterUser, RegisterPartner, ForgetEmail, PartnerAllProducts, ForgetPassword } from "../components/pages";
import { UnregisteredBlogshopOwner } from "../components/pages";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/joinus" element={<JoinUs />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/registerrole" element={<RegisterRole />} />
          <Route path="/RegisterUser" element={<RegisterUser />} />
          <Route path="/RegisterPartner" element={<RegisterPartner />} />
          <Route path="/ForgetEmail" element={<ForgetEmail/>} />
          <Route path="/UnregisteredBlogshopOwner" element={<UnregisteredBlogshopOwner/>} />
          <Route path="/PartnerAllProducts" element={<PartnerAllProducts/>} />
          <Route path="/ForgetPassword" element={<ForgetPassword/>} />
        </Routes>
      </div>
    </Router>
  );
}
