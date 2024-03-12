import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "../components/Navbar"; // Update the path if necessary
//import ContactUs from "../contact/index";
import { AboutUs, Home, Information, Login, RegisterRole, RegisterUser, ForgetEmail} from "../components/pages";
import { UnregisteredBlogshopOwner } from "../components/pages";

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
          <Route path="/registerrole" element={<RegisterRole />} />
          <Route path="/RegisterUser" element={<RegisterUser />} />
          <Route path="/ForgetEmail" element={<ForgetEmail/>} />
          <Route path="/UnregisteredBlogshopOwner" element={<UnregisteredBlogshopOwner/>} />
        </Routes>
      </div>
    </Router>
  );
}
