import React, { useState, useRef } from 'react';
import './AddProduct.css';
import PartnerSidebarNavbar from "../PartnerSidebarNavbar";
import Select from 'react-select'; // Import React-Select
import PartnerFooter from "../PartnerFooter";

function AddProduct() {
    const [uploadType, setUploadType] = useState(null);
    const imageFileRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        link: '',
        description: '',
        tags: [],
        category: '',
        subCategory: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(); // Create a new FormData object
    
            // Append form data fields to the FormData object
            formData.append('name', formData.name);
            formData.append('price', formData.price);
            formData.append('link', formData.link);
            formData.append('description', formData.description);
            formData.append('category', formData.category);
            formData.append('subCategory', formData.subCategory);
            // Access the correct file input element based on its name
            const imageFile = imageFileRef.current.files[0];
            formData.append('imageFile', imageFile);

            console.log('FormData:', formData);
    
            // Send the POST request with FormData
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                throw new Error('Failed to upload product');
            }
            console.log('Product uploaded successfully');
        } catch (error) {
            console.error('Error uploading product:', error);
            // Handle error (e.g., display error message to the user)
        }
    };
    
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
        { value: 'bracelet', label: '#bracelet' },
        { value: '90s', label: '#90s' },
        { value: 'formal', label: '#formal' },
        { value: 'oldmoney', label: '#oldmoney' }
    ];

    // State to keep track of selected tags
    const [selectedTags, setSelectedTags] = useState([]);


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
                            className={uploadType === 'single' ? 'button-active' : ''}
                            onClick={() => setUploadType('single')}
                        >
                            Single Upload
                        </button>
                        <button
                            type="button"
                            className={uploadType === 'batch' ? 'button-active' : ''}
                            onClick={() => setUploadType('batch')}
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
                                </label><br />

                                <label>
                                    Category:
                                    {/* Assuming `Select` is imported from 'react-select' and `catOptions` is defined */}
                                    <Select
                                        id="category"
                                        name="category"
                                        options={catOptions}
                                        value={catOptions.find(option => option.value === formData.category)}
                                        onChange={(selectedOption) => setFormData({ ...formData, category: selectedOption.value })}
                                    />
                                </label><br />

                                <label>
                                    Sub-Category:
                                    {/* Populate options dynamically based on selected category */}
                                    <Select
                                        id="subcategory"
                                        name="subcategory"
                                        options={subcatOptions}
                                        value={subcatOptions.find(option => option.value === formData.subCategory)}
                                        onChange={(selectedOption) => setFormData({ ...formData, subCategory: selectedOption.value })}
                                    />
                                </label><br />

                                <label>
                                    Price:
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                    />
                                </label><br />

                                <label htmlFor="imageFile">Image File:</label>
                                <input type="file" ref={imageFileRef} name="imageFileSingle" accept="image/*" />


                                <label>
                                    Product Link: <br />
                                    <input
                                        type="linkurl"
                                        id="productLink"
                                        name="link"
                                        value={formData.link}
                                        onChange={handleInputChange}
                                    />
                                </label><br />

                                <label>
                                    Product Information:
                                    <br /><textarea
                                        id="productInfo"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </label><br />

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
                                </label><br />
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

                    <button type="submit">Upload</button>
                </form>
            </div>
            <PartnerFooter />
        </div>
    );
}

export default AddProduct;
