// Import React and useState for handling state
import React, { useState } from 'react';
import './AdminGenerateReport.css'; // Ensure you have a CSS file with this name in the same directory
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

// A functional component for the report generator
function ReportGenerator() {
  // State to keep track of the selected month and year
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Placeholder data for the table
  const reportData = [
    { name: 'Coco Beth', type: 'User', status: 'Suspended' },
    { name: 'LoveClothes.co', type: 'admin', status: 'Active' },
    // Add more placeholder data as needed...
  ];

  // Function to handle month change
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // Implement logic to fetch the report based on selected month
  };

  // Function to handle year change
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    // Implement logic to fetch the report based on selected year
  };

  // Function to generate the report
  const handleGenerateReport = () => {
    // Implement logic to generate the report
  };

  // Render the component
  return (
    <div>
    <AdminSidebarNavbar/>
    <div className="adminreport-generator-container">
      <div className="adminreportnavbar-placeholder"></div> {/* Blank space for the navbar */}
      <h1 className="adminreporth1">Admin's Report</h1>
      <div className="adminreportfilter-bar">
        {/* Month select */}
        <select name="month" id="month" onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (v, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        {/* Year select */}
        <select name="year" id="year" onChange={handleYearChange}>
          {Array.from({ length: 10 }, (v, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>
      </div>
      <table className="adminreport-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Profile Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="admingenerate-button" onClick={handleGenerateReport}>
        Generate
      </button>
    </div>
    <AdminFooter/>
    </div>
  );
}

export default ReportGenerator;