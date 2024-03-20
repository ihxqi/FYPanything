// Import React and useState for handling state
import React, { useState } from 'react';
import './AdminGenerateReport.css'; // Ensure you have a CSS file with this name in the same directory
import UserNavbar from "../UserNavbar";

// A functional component for the report generator
function ReportGenerator() {
  // State to keep track of the selected month
  const [selectedMonth, setSelectedMonth] = useState('');

  // Placeholder data for the table
  const reportData = [
    { name: 'Name1', type: 'User', amount: '$10' },
    { name: 'Name2', type: 'User', amount: '$10' },
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
            <th>Profile Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.amount}</td>
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
