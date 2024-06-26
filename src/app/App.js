import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { VerifyEmail, ResetPassword,  PartnerGenerateReport, AdminGenerateReport, AdminAllProduct, AdminManageUser, UserProfile, UserCategories, UserHomepage, UserRecentlyViewed, AddProduct, AboutUs, Home, JoinUs, Login, PartnerProfile, AdminCategories, RegisterRole, RegisterUser, RegisterPartner, ForgetEmail, PartnerAllProducts, ForgetPassword, UserBookmarks, AdminManagePartner } from "../components/pages";
import { UnregisteredBlogshopOwner } from "../components/pages";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/joinus" element={<JoinUs />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/registerrole" element={<RegisterRole />} />
          <Route path="/RegisterUser" element={<RegisterUser />} />
          <Route path="/RegisterPartner" element={<RegisterPartner />} />
          <Route path="/UnregisteredBlogshopOwner" element={<UnregisteredBlogshopOwner/>} />
          <Route path="/PartnerAllProducts" element={<PartnerAllProducts/>} />
          <Route path="/ForgetPassword" element={<ForgetPassword/>} />
          <Route path="/PartnerProfile" element={<PartnerProfile/>} />
          <Route path="/AdminCategories" element={<AdminCategories/>} />
          <Route path="/AddProduct" element={<AddProduct/>} />
          <Route path="/UserHomepage" element={<UserHomepage/>} />
          <Route path="/UserCategories" element={<UserCategories/>} />
          <Route path="/UserProfile" element={<UserProfile/>} />
          <Route path="/UserBookmarks" element={<UserBookmarks/>} />
          <Route path="/AdminManagePartner" element={<AdminManagePartner/>} />
          <Route path="/AdminManageUser" element={<AdminManageUser/>} />
          <Route path="/AdminAllProduct" element={<AdminAllProduct/>} />
          <Route path="/AdminGenerateReport" element={<AdminGenerateReport/>} />
          <Route path="/PartnerGenerateReport" element={<PartnerGenerateReport/>} />
          <Route path="/UserRecentlyViewed" element={<UserRecentlyViewed/>} />
          <Route path="/ResetPassword/:token" element={<ResetPassword/>} />
          <Route path="/VerifyEmail/:token" element={<VerifyEmail/>} />
        </Routes>
      </div>
    </Router>
  );
}
