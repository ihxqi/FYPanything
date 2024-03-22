import React from 'react';
import './UnregisteredBlogshopOwner.css'; // Ensure you have this CSS file with the correct styles
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

function UnregisteredBlogshopOwner() {
  const logout = () => {
    console.log("Logged out");
    window.location.href = 'index.html'; // This line might need to be adjusted for React Router
  };
  
  return (
   
   <div className="white-box">
    <div>
     <AdminSidebarNavbar />
     <div class="header">
  <h2>Blogshop Owner Onboarding</h2>
  </div>
  
      <table id="profileTable" className="CMtable" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Blogshop Owner</th>
            <th>URL</th>
            <th>Category</th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td contentEditable="false">Love clothes</td>
            <td contentEditable="false">loveclothes.co</td>
            <td contentEditable="false">Apparel</td>
            <td>
              <input type="radio" id="approve1" name="manage" value="approve" />
              
            </td>
            <td>
              <input type="radio" id="reject1" name="manage" value="reject" />
              
            </td>
          </tr>

          <tr>
            <td contentEditable="false">NTUC</td>
            <td contentEditable="false">www.NTUC.com</td>
            <td contentEditable="false">Food</td>
            <td>
              <input type="radio" id="approve1" name="manage1" value="approve" />
              
            </td>
            <td>
              <input type="radio" id="reject1" name="manage1" value="reject" />
              
            </td>
          </tr>
        </tbody>
      </table>
      <br />
    </div>
    <AdminFooter/>
    </div>
  );
}

export default UnregisteredBlogshopOwner;
