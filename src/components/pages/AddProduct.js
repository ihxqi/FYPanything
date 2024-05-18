import React, { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Select from "react-select";
import PartnerSidebarNavbar from "../PartnerSidebarNavbar";
import PartnerFooter from "../PartnerFooter";
import "./AddProduct.css";

const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

function AddProduct() {
  const [uploadType, setUploadType] = useState(null);
  const imageFileRef = useRef(null);
  const [image, setImage] = useState("");
  const [catOptions, setCatOptions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    link: "",
    description: "",
    category: "",
    imageFile: null,
    email: "",
    user_id: "",
  });
  const data = [
    [
      "name",
      "price",
      "link",
      "description",
      "category",
      "imageFile",
      "",
      "For imageFile column upload your images to `https://base64.guru/converter/encode/image` to get a base64String and then fill it into your value where it fits",
    ],
    [
      "Product 1",
      "10",
      "https://example.com/product1",
      "Description 1",
      "Category 1",
    ],
    [
      "Product 2",
      "20",
      "https://example.com/product2",
      "Description 2",
      "Category 2",
    ],
  ];
  const [userSession, setUserSession] = useState(null);
  const [blank, setRedirectToBlank] = useState(false);

  useEffect(() => {
    // Extract data from localStorage
    const userSession = JSON.parse(localStorage.getItem("user_session"));
    if (!userSession || userSession.role !== "Partner") {
      // Set redirectToLogin to true if user role is not admin or if user session is null
      setRedirectToBlank(true);
    }
    setUserSession(userSession);
    fetchCategories();
    if (userSession) {
      // Update formData state with user session data
      setFormData({
        ...formData,
        email: userSession.email, // Assuming email is needed for the form
        // Populate other fields as needed
      });
    }
  }, []);

  useEffect(() => {
    const fileInput = imageFileRef.current;
    if (fileInput && fileInput.files.length > 0) {
      const imageFile = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(imageFile);
    }
  }, [imageFileRef.current]);

  if (blank) {
    return <Navigate to="/login" />;
  }

  const handleCategoryChange = (selectedOption) => {
    setFormData({
      ...formData,
      category: selectedOption.value,
      subCategory: "",
    });
  };

  const fetchCategoriesCSV = async () => {
    try {
      const response = await fetch(`${apiUrl}/get_allcategories`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();

      // Extract category names from the API response
      const categories = Object.values(data);

      // Create CSV content
      let csvContent = "Categories:\n";
      categories.forEach((category) => {
        csvContent += category + "\n";
      });

      // Create a Blob object with the CSV content
      const blob = new Blob([csvContent], { type: "text/csv" });

      // Create a URL for the Blob object
      const csvUrl = URL.createObjectURL(blob);

      return csvUrl;
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      return null;
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/get_categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      const categories = Object.keys(data.categories).map((category) => ({
        value: category,
        label: category,
      }));
      setCatOptions(categories);
      // setSelectedCategory(categories[0]); // Commented out to prevent default selection
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const handleCategoryListDownload = async () => {
    const csvData = await fetchCategoriesCSV();
    if (csvData) {
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvData));
      link.setAttribute("download", "categories.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (uploadType === "single") {
      // Single upload logic
      // Check if all required fields are filled
      const requiredFields = [
        "name",
        "price",
        "link",
        "description",
        "category",
      ];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        window.alert(
          `Please fill in the following fields: ${missingFields.join(", ")}`
        );
        return;
      }

      try {
        const imageFile = imageFileRef.current.files[0];
        const base64Image = await convertImageToBase64(imageFile);
        const user_id = userSession.user_id;
        // Send the POST request with FormData
        const response = await fetch(`${apiUrl}/add_product`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            price: formData.price,
            link: formData.link,
            description: formData.description,
            category: formData.category,
            imageFile: base64Image,
            user_id: user_id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to upload product");
        }
        // console.log("Product uploaded successfully");
        window.alert("Product uploaded");
      } catch (error) {
        console.error("Error uploading product:", error);
        // Handle error (e.g., display error message to the user)
      }
    } else if (uploadType === "batch") {
      // Batch upload logic
      const excelFile = document.getElementById("excelFile").files[0];
      if (!excelFile) {
        window.alert("Please select an Excel file for batch upload.");
        return;
      }

      try {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const csvData = event.target.result;

          // Now you can parse the CSV data
          const parsedData = parseCSVData(csvData);

          // Extract user_id from localStorage
          const userSession = JSON.parse(localStorage.getItem("user_session"));
          const user_id = userSession.user_id;

          let success = true;

          // Send POST request for each row in the CSV
          for (const rowData of parsedData) {
            const response = await fetch(`${apiUrl}/add_product`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: rowData.name,
                price: rowData.price,
                link: rowData.link,
                description: rowData.description,
                category: rowData.category,
                imageFile: rowData.imageFile, // Assuming you have already converted it to base64
                user_id: user_id,
              }),
            });

            if (!response.ok) {
              success = false;
              window.alert(
                "Incomplete or incorrect data in excel file provided"
              );
              // Handle error (e.g., display error message to the user)
              break; // Exit the loop if an error occurs
            }
          }

          if (success) {
            window.alert("All products uploaded successfully");
          }
        };
        reader.readAsText(excelFile);
      } catch (error) {
        console.error("Error uploading batch:", error);
        // Handle error (e.g., display error message to the user)
      }
    }
  };

  function parseCSVData(csvData) {
    const rows = csvData.split("\n"); // Split CSV data into rows
    const headers = rows[0].split(","); // Extract headers from the first row
    const parsedData = [];

    // Iterate over rows starting from the second row (index 1)
    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(","); // Split row data into columns

      // Check if the row is empty or contains only whitespace
      if (rowData.every((cell) => !cell.trim())) {
        continue; // Skip empty row
      }

      // Create an object to store the values for each row
      const rowObject = {};

      // Iterate over columns and map them to headers
      for (let j = 0; j < headers.length; j++) {
        // Trim whitespace from column values and add them to the rowObject
        rowObject[headers[j].trim()] = rowData[j] ? rowData[j].trim() : "";
      }

      // Add the rowObject to the parsedData array
      parsedData.push(rowObject);
    }

    return parsedData;
  }

  const convertToCSV = (data) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      data.map((row) => row.join(",")).join("\n");
    return encodeURI(csvContent);
  };

  const handleDownload = () => {
    const csvData = convertToCSV(data);
    const link = document.createElement("a");
    link.setAttribute("href", csvData);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result.split(",")[1]); // Extract base64 data
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(imageFile); // Read the image file as Data URL
    });
  };

  return (
    <div>
      <PartnerSidebarNavbar />
      <div>
        <div className="AddProductHeader">
          <h2>Add Product</h2>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="addproduct-button-group">
            <button
              type="button"
              className={uploadType === "single" ? "button-active" : ""}
              onClick={() => setUploadType("single")}
            >
              Single Upload
            </button>
            <button
              type="button"
              className={uploadType === "batch" ? "button-active" : ""}
              onClick={() => setUploadType("batch")}
            >
              Batch Upload
            </button>
          </div>
          <br />

          {uploadType === "single" && (
            <div>
              <div className="single-upload-form">
                <h3>Single Upload</h3>
                <label>
                  Name:
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </label>
                <br />

                <label>
                  Category:
                  <Select
                    id="category"
                    name="category"
                    options={catOptions}
                    value={catOptions.find(
                      (option) => option.value === formData.category
                    )}
                    onChange={handleCategoryChange}
                  />
                </label>
                <br />

                <label>
                  Price:
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </label>
                <br />

                <label htmlFor="imageFile">
                  Image File:
                  <br />
                  <input
                    type="file"
                    ref={imageFileRef}
                    name="imageFileSingle"
                    accept="image/*"
                    onChange={() => {}}
                  />
                  <br />
                  {image === "" || image === null ? (
                    ""
                  ) : (
                    <img width={200} height={250} src={image} />
                  )}
                </label>
                <label>
                  Product Link: <br />
                  <input
                    type="linkurl"
                    id="productLink"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                  />
                </label>
                <br />

                <label>
                  Product Information:
                  <br />
                  <textarea
                    id="productInfo"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
              </div>
            </div>
          )}

          {uploadType === "batch" && (
            <div>
              <div className="batch-upload-form">
                <h3>Batch Upload</h3>
                <div className="guide" onClick={handleDownload}>
                  Click here to download format for uploading
                </div>
                <div
                  className="categorieslist"
                  onClick={handleCategoryListDownload}
                >
                  Click here to download category list
                </div>
                <hr />
                <label htmlFor="excelFile">Excel File:</label>
                <input type="file" id="excelFile" accept=".xlsx, .xls, .csv" />
              </div>
            </div>
          )}

          <button type="submit">Upload</button>
        </form>
      </div>
      <PartnerFooter />
    </div>
  );
}

export default AddProduct;
