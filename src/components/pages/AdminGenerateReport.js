// Import React and useState for handling state
import React, { useState, useEffect } from "react";
import "./AdminGenerateReport.css"; // Ensure you have a CSS file with this name in the same directory
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import AdminFooter from "../AdminFooter";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

// A functional component for the report generator
function UserReport() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [reportData, setReportData] = useState([]); // State for report data
  const [filteredData, setFilteredData] = useState([]); // State for filtered data

  useEffect(() => {
    fetchReportData(); // Fetch report data when the component mounts
  }, [selectedMonth, selectedYear]);

  const fetchReportData = async () => {
    try {
      console.log("fetching user")
      const response = await fetch(`${apiUrl}/get_useraccounts`);
      if (!response.ok) {
        throw new Error("Failed to fetch user accounts");
      }
      const data = await response.json();
      setReportData(
        data.accounts.map((user) => ({
          ...user,
          age: calculateAge(user.dob), // Calculate age based on date of birth
        }))
      );
    } catch (error) {
      console.error("Error fetching user accounts:", error.message);
    }
  };

  const calculateAge = (dob) => {
    const dobYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - dobYear;
  };

  const handleMonthYearChange = (event) => {
    const selectedMonthYear = event.target.value;
    console.log("Selected month-year:", selectedMonthYear);
    const month = selectedMonthYear.split("-")[0];
    const year = selectedMonthYear.split("-")[1];
    setSelectedMonth(month);
    setSelectedYear(year);

    const filteredData = reportData.filter((item) => {
      if (item.date_registered) {
        const [itemYear, itemMonth] = item.date_registered.split("-");
        console.log("Date registered:", item.date_registered);
        console.log("Split date:", itemYear, itemMonth);
        return (
          parseInt(itemMonth) === parseInt(month) &&
          parseInt(itemYear) === parseInt(year)
        );
      }
      return false; // Exclude items with undefined date_registered
    });
    console.log("Filtered data:", filteredData);
    setFilteredData(filteredData);

    if (filteredData.length === 0) {
      window.alert("No users in selected period!");
    }
  };

  const handleGenerateReport = async () => {
    try {
      // Convert report data to CSV format
      const csvData = convertToCSV(filteredData);
  
      // Create a Blob object containing the CSV data
      const blob = new Blob([csvData], { type: "text/csv" });
  
      // Create a URL for the Blob object
      const url = window.URL.createObjectURL(blob);
  
      // Create a link element for downloading the CSV file
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_report.csv");
  
      // Simulate a click on the link to trigger the download
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating report:", error.message);
    }
  };
  
  const convertToCSV = (data) => {
    // Use reportData if data is empty
    if (data.length === 0) {
      data = reportData;
    }
  
    // Define the fields to include in the CSV
    const fields = ["Name", "Joined Date", "Gender", "Age"];
  
    // Generate CSV header with the specified fields
    const header = fields.join(",");
  
    // Generate CSV rows with data from the specified fields
    const rows = data.map((item) => {
      // Format joined date if needed
      const joinedDate = new Date(item.date_registered).toLocaleDateString();
  
      // Return CSV row with the specified fields
      return [item.name, joinedDate, item.gender, item.age].join(",");
    });
  
    // Combine header and rows to create the CSV content
    return [header, ...rows].join("\n");
  };
  

  return (
    <div>
      <AdminSidebarNavbar />
      <div className="adminreport-generator-container">
        <div className="adminreportnavbar-placeholder"></div>
        <h1 className="adminreporth1">Admin's Report</h1>
        <h2 className="adminreporth2">Users</h2>
        <div className="adminreportfilter-bar">
          <select
            name="month-year"
            id="month-year"
            onChange={handleMonthYearChange}
          >
            {Array.from({ length: 60 }, (v, i) => {
              const currentDate = new Date();
              const year = currentDate.getFullYear() - Math.floor(i / 12);
              const month = (i % 12) + 1;
              const monthName = new Date(
                currentDate.getFullYear(),
                month - 1
              ).toLocaleString("default", { month: "long" });
              return (
                <option key={i} value={`${month}-${year}`}>
                  {`${monthName} ${year}`}
                </option>
              );
            })}
          </select>
        </div>

        <table className="adminreport-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Joined Date</th>
              <th>Gender</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {(selectedMonth || selectedYear) && filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.date_registered}</td>
                  <td>{item.gender}</td>
                  <td>{item.age}</td>
                </tr>
              ))
            ) : (
              reportData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.date_registered}</td>
                  <td>{item.gender}</td>
                  <td>{item.age}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <button className="admingenerate-button" onClick={handleGenerateReport}>
          Generate
        </button>
      </div>
      <AdminFooter />
    </div>
  );
}

export default UserReport;
