import React, { useState } from 'react';
import './UnregisteredBlogshopOwner.css'; // Ensure you have this CSS file with the correct styles
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

function UnregisteredBlogshopOwner() {
  const [actionStatus, setActionStatus] = useState({}); // State to hold individual statuses
  const logout = () => {
    console.log("Logged out");
    window.location.href = 'index.html'; // This line might need to be adjusted for React Router
  };

  const handleApprove = (partnerName) => {
    console.log("Approve clicked for:", partnerName);
    // Add activate logic here
    setActionStatus(prevStatus => ({
      ...prevStatus,
      [partnerName]: "Approved" // Update status for the clicked partner
    }));
  };

  const handleReject = (partnerName) => {
    console.log("Reject clicked for:", partnerName);
    // Add suspend logic here
    setActionStatus(prevStatus => ({
      ...prevStatus,
      [partnerName]: "Rejected" // Update status for the clicked partner
    }));
  };

  const handleSubmit = () => {
    // Add logic to submit all approvals or rejections
    console.log("Submit button clicked");
  };
  
  return (
  
    <div>
     <AdminSidebarNavbar />
     <div className="CM-white-box">
     <hr />
     <div className='CMcontainer'>
     <div class="CMheader">
  <h2>Blogshop Owner Onboarding</h2>
  </div>
      <table id="profileTable" className="CMtable" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Blogshop Owner</th>
            <th>URL</th>
            <th>UEN</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td contentEditable="false">Love clothes</td>
            <td contentEditable="false">loveclothes.co</td>
            <td contentEditable="false">xxx</td>
            <td contentEditable="false">Apparel</td>
            <td>{actionStatus['Love clothes']}</td>
            <td className="CMtable-action-column">
                  <button className="admin-approve-partner-button" onClick={() => handleApprove('Love clothes')}>Approve</button>
                  <button className="admin-reject-partner-button" onClick={() => handleReject('Love clothes')}>Reject</button>
            </td>
          </tr>
          <tr>
            <td contentEditable="false">NTUC</td>
            <td contentEditable="false">www.NTUC.com</td>
            <td contentEditable="false">xxx</td>
            <td contentEditable="false">Food</td>
            <td>{actionStatus['NTUC']}</td>
            <td className="CMtable-action-column">
                  <button className="admin-approve-partner-button" onClick={() => handleApprove('NTUC')}>Approve</button>
                  <button className="admin-reject-partner-button" onClick={() => handleReject('NTUC')}>Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
        <button className="unreg-submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    </div>
    <AdminFooter/>
    </div>
  );
}

export default UnregisteredBlogshopOwner;
