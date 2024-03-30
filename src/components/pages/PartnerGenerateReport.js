// Import React and useState for handling state
import React, { useState } from 'react';
import './PartnerGenerateReport.css'; // Ensure you have a CSS file with this name in the same directory
import PartnerSidebarNavbar from "../PartnerSidebarNavbar";
import PartnerFooter from "../PartnerFooter";

// A functional component for the report generator
function ReportGenerator() {
  // State to keep track of the selected month
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Placeholder data for the table
  const reportData = [
    { product: 'Product1', noOfLikes: '2', noOfDislikes: '3', linkclick: '4'},
    { product: 'Product2', noOfLikes: '5', noOfDislikes: '1', linkclick: '2'},
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

  const handleGenerateReport = () => {
    // Implement logic to download the report
  };

  // Render the component
  return (
    <div>
    <PartnerSidebarNavbar/>
    <div className="partnerreport-generator-container">
      <div className="partnerreportnavbar-placeholder"></div> {/* Blank space for the navbar */}
      <h1 className="partnerreporth1">Partner's Report</h1>
      <div className="partnerreportfilter-bar">
        {/*<label htmlFor="month">Month:</label>*/}
        <select name="month" id="month" onChange={handleMonthChange}>
          {/* Map through all months and render options */}
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
      <table className="partnerreport-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Number of Likes</th>
            <th>Number of Dislikes</th>
            <th>Product Link Clicked</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.noOfLikes}</td>
              <td>{item.noOfDislikes}</td>
              <td>{item.linkclick}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="partnergenerate-button" onClick={handleGenerateReport}>
        Generate
      </button>
    </div>
    <PartnerFooter/>
    </div>
  );
}

export default ReportGenerator;
