import React, { useState } from 'react';
import './AddProduct.css';
import UserNavbar from "../UserNavbar"; // Replace "../UserNavbar" with the correct path to your UserNavbar component

function AddProduct() {
    const [uploadType, setUploadType] = useState(null);

    const handleUploadTypeChange = (event) => {
        setUploadType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic for handling form submission
        console.log("Form submitted!");
    };

    return (
        <div>
            <UserNavbar />
            <div>
                <div class ="header">
                <h2>Add Product</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div class="single-upload-section">
                        <label>
                            <input type="radio" name="uploadType" value="single" onChange={handleUploadTypeChange} />
                            Single 
                        </label>
                     
                    </div>
                    <div class="batch-upload-section">
                        <label>
                            <input type="radio" name="uploadType" value="batch" onChange={handleUploadTypeChange} />
                            Batch 
                        </label>
                    </div>


                    {uploadType === "single" && (
                        <div>
                            <h3>Single Upload</h3>
                            <form>
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" />

                                <label htmlFor="category">Category:</label>
                                <select id="category">
                                    <option value="electronics">Electronics</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="books">Books</option>
                                    {/* Add more options as needed */}
                                </select>

                                <label htmlFor="subCategory">Sub-Category:</label>
                                <select id="subCategory">
                                    {/* Populate options dynamically based on selected category */}
                                </select>

                                <label htmlFor="price">Price:</label>
                                <input type="number" id="price" />

                                <label htmlFor="imageFile">Image Preview:</label>
                                <input type="url" id="imageFile" placeholder="Image URL" />

                                <label htmlFor="productLink">Product Link:</label>
                                <input type="url" id="productLink" />

                                <label htmlFor="productInfo">Product Information:</label>
                                <textarea id="productInfo" />

                                <label htmlFor="tags">Tags:</label>
                                <input type="text" id="tags" list="tagList" />
                                <datalist id="tagList">
                                    <option value="Tag1" />
                                    <option value="Tag2" />
                                    <option value="Tag3" />
                                    {/* Add more options as needed */}
                                </datalist>
                            </form>
                        </div>
                    )}

                    {uploadType === "batch" && (
                        <div>
                            <h3>Batch Upload</h3>
                            <form>
                                <label htmlFor="imageFile">Image File:</label>
                                <input type="file" id="imageFile" accept="image/*" />

                                <label htmlFor="excelFile">Excel File:</label>
                                <input type="file" id="excelFile" accept=".xlsx, .xls" />
                            </form>
                        </div>
                    )}

                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
