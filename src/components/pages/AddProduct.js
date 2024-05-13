import React, { useState, useRef, useEffect } from "react";
import "./AddProduct.css";
import PartnerSidebarNavbar from "../PartnerSidebarNavbar";
import Select from "react-select"; // Import React-Select
import PartnerFooter from "../PartnerFooter";

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
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    fetchCategories();
    // Extract data from localStorage
    const userSession = JSON.parse(localStorage.getItem("user_session"));
    setUserSession(userSession);
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
  

  const handleCategoryChange = (selectedOption) => {
    setFormData({
      ...formData,
      category: selectedOption.value,
      subCategory: "",
    });
  };

  const fetchCategories = async () => {
    try {
        const response = await fetch(`${apiUrl}/get_categories`);
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        const categories = Object.keys(data.categories).map(category => ({
            value: category,
            label: category
        }));
        setCatOptions(categories);
        // Assuming the first category is selected by default
    } catch (error) {
        console.error("Error fetching categories:", error.message);
    }
};


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if all required fields are filled
    const requiredFields = ['name', 'price', 'link', 'description', 'category'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      window.alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
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
      console.log("Product uploaded successfully");
      window.alert("Product uploaded");
    } catch (error) {
      console.error("Error uploading product:", error);
      // Handle error (e.g., display error message to the user)
    }
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
                <hr />
                <label htmlFor="imageFile">Image File:</label>
                <input type="file" id="imageFile" accept="image/*" />

                <label htmlFor="excelFile">Excel File:</label>
                <input type="file" id="excelFile" accept=".xlsx, .xls" />
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
