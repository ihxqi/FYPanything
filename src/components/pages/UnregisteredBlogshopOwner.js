import React, { useState, useEffect } from "react";
import "./UnregisteredBlogshopOwner.css"; // Ensure you have this CSS file with the correct styles
import Select from "react-select"; // Import React-Select
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

function UnregisteredBlogshopOwner() {
  const [actionStatus, setActionStatus, partnerName] = useState({});
  const [partnerData, setPartnerData] = useState([]);
  

  useEffect(() => {
    // Fetch partner accounts from backend API when the component mounts
    fetchPartnerAccounts();
  }, [actionStatus]);

  const fetchPartnerAccounts = async () => {
    try {
      const response = await fetch("/get_unregpartneraccounts");
      if (!response.ok) {
        throw new Error("Failed to fetch unregistered partners");
      }
      const data = await response.json();
      setPartnerData(data.accounts);
    } catch (error) {
      console.error("Error fetching unregistered partners:", error);
    }
  };

  const handleAuthenticate = async (partner) => {
    console.log("Authenticate clicked for:", partner.email);
    // Add activate logic here
    try {
      const emailString = String(partner.email);
      console.log(emailString);
      // Make a PUT request to update the partner's status
      const response = await fetch(`/authenticate_partner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailString }),
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate partner");
      }

      // Update the action status in the frontend
      setActionStatus((prevStatus) => ({
        ...prevStatus,
        [partner.email]: "authenticate",
      }));

      console.log("Partner authenticate successfully");
    } catch (error) {
      console.error("Error authenticating partner:", error.message);
    }
    setActionStatus((prevStatus) => ({
      ...prevStatus,
      [partnerName]: "Activated", // Update status for the clicked partner
    }));
  };

  const handleReject = async (partner) => {
    console.log("Reject clicked for:", partner.email);
    try {
      const emailString = String(partner.email);
      console.log(emailString);
      // Make a PUT request to update the partner's status
      const response = await fetch(`/reject_partner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailString }),
      });

      if (!response.ok) {
        throw new Error("Failed to reject partner");
      }

      // Update the action status in the frontend
      setActionStatus((prevStatus) => ({
        ...prevStatus,
        [partner.email]: "Rejected",
      }));

      console.log("Partner rejected successfully");
    } catch (error) {
      console.error("Error rejecting partner:", error.message);
    }
  };

  return (
    <div>
      <AdminSidebarNavbar />
      <div className="CM-white-box">
        <hr />
        <div className="CMcontainer">
          <div className="CMheader">
            <h2>Unregistered Blogshop Owners</h2>
          </div>
          <table className="CMtable" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>E-mail</th>
                <th>Blogshop Owner</th>
                <th>UEN Number</th>
                <th>Category</th>
                <th>Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {partnerData.map((partner, index) => (
                <tr key={index}>
                  <td>{partner.email}</td>
                  <td>{partner.name}</td>
                  <td>{partner.UEN}</td>
                  <td>{partner.category}</td>
                  <td>
                        <a
                          href={partner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {partner.link}
                        </a>
                      </td>
                  <td className="CMtable-action-column">
                    <button
                      className="admin-approve-partner-button"
                      onClick={() => handleAuthenticate(partner)}
                    >
                      Approve
                    </button>
                    <button
                      className="admin-suspend-partner-button"
                      onClick={() => handleReject(partner)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}

export default UnregisteredBlogshopOwner;
