import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { UserProfile, UserCategories, Links, UserHomepage, AddProduct, AboutUs, Home, JoinUs, Login, PartnerProfile, AdminCategories, RegisterRole, RegisterUser, RegisterPartner, ForgetEmail, PartnerAllProducts, ForgetPassword, InterestSurvey } from "../components/pages";
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
          <Route path="/InterestSurvey" element={<InterestSurvey/>} />
          <Route path="/PartnerProfile" element={<PartnerProfile/>} />
          <Route path="/AdminCategories" element={<AdminCategories/>} />
          <Route path="/AddProduct" element={<AddProduct/>} />
          <Route path="/UserHomepage" element={<UserHomepage/>} />
          <Route path="/UserCategories" element={<UserCategories/>} />
          <Route path="/UserProfile" element={<UserProfile/>} />
          
          <Route path="/Links" element={<Links/>} />
        </Routes>
      </div>
    </Router>
  );
}
