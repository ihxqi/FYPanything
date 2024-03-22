// Import React and useState for handling state
import React, { useState } from 'react';
import './PartnerGenerateReport.css'; // Ensure you have a CSS file with this name in the same directory
import UserNavbar from "../UserNavbar";

// A functional component for the report generator
function ReportGenerator() {
  // State to keep track of the selected month
  const [selectedMonth, setSelectedMonth] = useState('');

  // Placeholder data for the table
  const reportData = [
    { name: 'Blogshop1', noOfLikes: '2', noOfDislikes: '3', linkclick: '4'},
    { name: 'Blogshop2', noOfLikes: '5', noOfDislikes: '1', linkclick: '2'},
    // Add more placeholder data as needed...
  ];

  // Function to handle month change
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // Implement logic to fetch the report based on selected month
  };

  // Function to download the report
  const handleDownloadReport = () => {
    // Implement logic to download the report
  };

  // Render the component
  return (
    <div>
    <UserNavbar/>
    <div className="report-generator-container">
      <div className="navbar-placeholder"></div> {/* Blank space for the navbar */}
      <h1>Generate Report</h1>
      <div className="filter-bar">
        {/*<label htmlFor="month">Month:</label>*/}
        <select name="month" id="month" onChange={handleMonthChange}>
          {/* Map through all months and render options */}
          {Array.from({ length: 12 }, (v, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <button onClick={() => {}}>Search</button>
      </div>
      <table className="report-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number of Likes</th>
            <th>Number of Dislikes</th>
            <th>Product Link Clicked</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.noOfLikes}</td>
              <td>{item.noOfDislikes}</td>
              <td>{item.linkclick}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="download-button" onClick={handleDownloadReport}>
        Download
      </button>
    </div>
    </div>
  );
}

export default ReportGenerator;
