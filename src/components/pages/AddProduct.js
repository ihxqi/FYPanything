import React, { useState } from 'react';
import './AddProduct.css';
import PartnerSidebarNavbar from "../PartnerSidebarNavbar";
import Select from 'react-select'; // Import React-Select
import PartnerFooter from "../PartnerFooter";

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

    const catOptions = [
        { value: 'shirt', label: 'shirt' },
        { value: 'dress', label: 'dress' },
        { value: 'accessories', label: 'accessories' }
    ];

    const subcatOptions = [
        { value: 'rings', label: 'rings' },
        { value: 'necklace', label: 'necklace' },
        { value: 'bracelet', label: 'bracelet' }
    ];

    const addptagOptions = [
        { value: 'black', label: '#black' },
        { value: 'necklace', label: '#necklace' },
        { value: 'bracelet', label: '#bracelet' }
    ];


    return (
        <div>
            <PartnerSidebarNavbar />
            <div>
                <div class="AddProductHeader">
                    <h2>Add Product</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="radio"
                            id="singleUpload"
                            name="uploadType"
                            value="single"
                            onChange={handleUploadTypeChange}
                        />
                        <label htmlFor="singleUpload">Single Upload</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="batchUpload"
                            name="uploadType"
                            value="batch"
                            onChange={handleUploadTypeChange}
                        />
                        <label htmlFor="batchUpload">Batch Upload</label>
                    </div>

                    {uploadType === "single" && (
                        <div>
                            <h3>Single Upload</h3>
                            <form className="single-upload-form">
                                <label>
                                    Name: 
                                    <input type="text" id="name" />
                                </label><br />

                                <label>
                                    Price:
                                    <input type="number" id="price" />
                                </label><br />

                                <label>
                                    Image:
                                    <input type="url" id="imageFile" placeholder="Image URL" />
                                </label><br />

                                <label>
                                    Link:
                                    <input type="url" id="productLink" />
                                </label><br />

                                <label>
                                    Description:
                                    <br /><textarea id="productInfo" />
                                </label><br />

                                <label><br />
     Category:
     {/* Assuming `Select` is imported from 'react-select' and `catOptions` is defined */}
     <Select id="category" name="category" options={catOptions} isMulti />
 </label><br />
 <label>
     Sub-Category:
     {/* Populate options dynamically based on selected category */}
     <Select id="subcategory" name="subcategory" options={subcatOptions} isMulti />
     </label><br />
                                <label>
                                    Tags:
                                    {/* Populate options dynamically based on selected category */}
                                    <Select id="addptag" name="addptag" options={addptagOptions} isMulti />
                                </label><br />
                            </form>

                        </div>
                    )}

                    {uploadType === "batch" && (
                        <div>
                            <h3>Batch Upload</h3>
                            <form className="batch-upload-form">
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
            <PartnerFooter/>
        </div>
    );
}

export default AddProduct;
