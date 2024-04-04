import React from 'react';
import './AdminManageUser.css'; // Ensure the CSS file is named correctly
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

function AdminManageUsers() {

  return (
    <div>
      <AdminSidebarNavbar />
      <div className="user-management-white-box"> {/* This div acts as the parent element */}
      
        <div className="user-management-container">
          <div className="user-management-header">
            <h1>User Accounts</h1>
          </div>
          <table className="user-management-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Country</th>
                <th>Address</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td contentEditable="false">Howard Wolowitz</td>
                <td contentEditable="false">howard@gmail.com</td>
                <td contentEditable="false">12/12/1999</td>
                <td contentEditable="false">Singapore</td>
                <td contentEditable="false">409 Jurong East Street 32 </td>
                <td contentEditable="false">12345678</td>
              </tr>
              <tr>
                <td contentEditable="false">John Wolowitz</td>
                <td contentEditable="false">John@gmail.com</td>
                <td contentEditable="false">11/11/1999</td>
                <td contentEditable="false">Singapore</td>
                <td contentEditable="false">123 Jurong East Street 32 </td>
                <td contentEditable="false">12345670</td>
              </tr>
              <tr>
                <td contentEditable="false">Howard Tan</td>
                <td contentEditable="false">Tan@gmail.com</td>
                <td contentEditable="false">10/10/1999</td>
                <td contentEditable="false">Singapore</td>
                <td contentEditable="false">409 Jurong West Street 32 </td>
                <td contentEditable="false">12395678</td>
              </tr>
            </tbody>
          </table>
        </div>
        <AdminFooter />
      </div>
    </div>
  );
}

export default AdminManageUsers;
