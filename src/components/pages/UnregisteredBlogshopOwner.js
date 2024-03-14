import React from 'react';
import './UnregisteredBlogshopOwner.css'; // Ensure you have this CSS file with the correct styles

function UnregisteredBlogshopOwner() {
  const logout = () => {
    console.log("Logged out");
    window.location.href = 'index.html'; // This line might need to be adjusted for React Router
  };

  return (
    <div className="white-box">
      <section>
        <div className="container1">
       
          <div className="topnav">
            <a href="#" onClick={logout}>LOG OUT</a>
          </div>
        </div>
      </section>
      <hr />
      <br />
      <br />
      
      <h2>Blogshop Owner Onboarding</h2>
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
            <td contentEditable="false">URL data</td>
            <td contentEditable="false">Category data</td>
            <td>
              <input type="radio" id="approve1" name="manage" value="approve" defaultChecked />
              
            </td>
            <td>
              <input type="radio" id="reject1" name="manage" value="reject" />
              
            </td>
          </tr>
        </tbody>
      </table>
      <br />
    </div>
  );
}

export default UnregisteredBlogshopOwner;
