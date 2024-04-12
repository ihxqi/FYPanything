import React, { useState, useRef, useEffect } from "react";
import "./AddProduct.css";
import PartnerSidebarNavbar from "../PartnerSidebarNavbar";
import Select from "react-select"; // Import React-Select
import PartnerFooter from "../PartnerFooter";

function AddProduct() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [uploadType, setUploadType] = useState(null);
  const imageFileRef = useRef(null);
  const [catOptions, setCatOptions] = useState([]);
  const [subcatOptions, setSubcatOptions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    link: "",
    description: "",
    category: "",
    subCategory: "",
    tags: [],
    imageFile: null,
    email:""
  });

  useEffect(() => {
    fetchCategories();
    // Extract data from localStorage
    const userSession = JSON.parse(localStorage.getItem('user_session'));
    console.log(userSession.email)
    if (userSession) {
      // Update formData state with user session data
      setFormData({
        ...formData,
        email: userSession.email, // Assuming email is needed for the form
        // Populate other fields as needed
      });
    }
  }, []);

  const handleCategoryChange = (selectedOption) => {
    setFormData({
      ...formData,
      category: selectedOption.value,
      subCategory: "",
    });
    // Fetch subcategories for the selected category from the backend
    fetchSubCategories(selectedOption.value);
    // Enable subcategory select input
    setSubcatDisabled(false);
  };

  const [subcatDisabled, setSubcatDisabled] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/get_categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      const categories = Object.keys(data.categories).map((category) => ({
        value: category,
        label: category,
      }));
      setCatOptions(categories);
      // Assuming the first category is selected by default
      if (categories.length > 0) {
        const allSubcategories = Object.values(data.categories).flat();
        setSubcatOptions(
          allSubcategories.map((subCategory) => ({
            value: subCategory,
            label: subCategory,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchSubCategories = async (category) => {
    try {
      const response = await fetch(`/get_categories?category=${category}`);
      if (!response.ok) {
        throw new Error("Failed to fetch subcategories");
      }
      const data = await response.json();
      const selectedCategoryData = data.categories[category];
      if (!selectedCategoryData) {
        throw new Error("Selected category not found");
      }
      setSubcatOptions(
        selectedCategoryData.map((subCategory) => ({
          value: subCategory,
          label: subCategory,
        }))
      );
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const imageFile = imageFileRef.current.files[0];
      const base64Image = await convertImageToBase64(imageFile);
      console.log("FormData:", formData);
      console.log(selectedTags)
      // Send the POST request with FormData
      const response = await fetch("/add_product", {
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
          subCategory: formData.subCategory,
          imageFile: base64Image,
          tags: selectedTags.map((x)=>(x.value)),
          email: formData.email
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
  const addptagOptions = [
    { value: "black", label: "#black" },
    { value: "necklace", label: "#necklace" },
    { value: "bracelet", label: "#bracelet" },
    { value: "90s", label: "#90s" },
    { value: "formal", label: "#formal" },
    { value: "oldmoney", label: "#oldmoney" },
  ];

  // State to keep track of selected tags

  return (
    <div>
      <PartnerSidebarNavbar />
      <div>
        <div className="AddProductHeader">
          <h2>Add Product</h2>
        </div>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
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
              <form className="single-upload-form">
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
                  {/* Assuming `Select` is imported from 'react-select' and `catOptions` is defined */}
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
                  Sub-Category:
                  {/* Populate options dynamically based on selected category */}
                  <Select
                    id="subcategory"
                    name="subcategory"
                    options={subcatOptions}
                    value={subcatOptions.find(
                      (option) => option.value === formData.subCategory
                    )}
                    onChange={(selectedOption) =>
                      setFormData({
                        ...formData,
                        subCategory: selectedOption.value,
                      })
                    }
                    isDisabled={subcatDisabled} // Disable until category is selected
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

                <label htmlFor="imageFile">Image File:</label>
                <input
                  type="file"
                  ref={imageFileRef}
                  name="imageFileSingle"
                  accept="image/*"
                />

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

                <label>
                  Tags:
                  <Select
                    id="addptag"
                    name="addptag"
                    options={addptagOptions}
                    isMulti
                    value={selectedTags}
                    onChange={(selectedOptions) => {
                      if (selectedOptions.length <= 5) {
                        setSelectedTags(selectedOptions);
                      } else {
                        // Optionally, you can alert the user that the limit has been reached
                        alert("You can select up to 5 tags only.");
                      }
                    }}
                    placeholder="Select tags..."
                  />
                </label>
                <br />
              </form>
            </div>
          )}

          {uploadType === "batch" && (
            <div>
              <form className="batch-upload-form">
                <h3>Batch Upload</h3>
                <hr />
                <label htmlFor="imageFile">Image File:</label>
                <input type="file" id="imageFile" accept="image/*" />

                <label htmlFor="excelFile">Excel File:</label>
                <input type="file" id="excelFile" accept=".xlsx, .xls" />
              </form>
            </div>
          )}

          <button type="submit">Upload!</button>
        </form>
      </div>
      <PartnerFooter />
    </div>
  );
}

export default AddProduct;
