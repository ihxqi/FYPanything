import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import PartnerSidebarNavbar from "../PartnerSidebarNavbar";
import Select from 'react-select'; // Import React-Select
import PartnerFooter from "../PartnerFooter";

function AddProduct() {
    const [uploadType, setUploadType] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [link, setProductLink] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        // Fetch categories and sub-categories when component mounts
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            // Fetch categories and sub-categories from the backend
            const response = await fetch('/categories');
            const data = await response.json();
            console.log(data)
            console.log('Received data:', data);

            // Extract categories and sub-categories from the data
            const categories = data.map(({ main }) => ({ value: main, label: main }));
            const subCategories = data.flatMap(({ sub }) => sub.map(subCat => ({ value: subCat, label: subCat })));

            // Set category and sub-category options
            setCategory(categories);
            setSubCategory(subCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    const handleUploadTypeChange = (event) => {
        setUploadType(event.target.value);
    };

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleCategoryChange = (selectedOptions) => {
        setCategory(selectedOptions);
    };

    const handleSubCategoryChange = (selectedOptions) => {
        setSubCategory(selectedOptions);
    };

    const handleTagsChange = (selectedOptions) => {
        setTags(selectedOptions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('link', link);
            formData.append('description', description);
            formData.append('category', category[0].value);
            formData.append('subCategory', subCategory.map(option => option.value).join(','));
            formData.append('tags', tags.map(option => option.value).join(','));
            formData.append('imageFile', imageFile); // Append image file here

            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                window.alert('Product uploaded successfully');
                console.log('Product uploaded successfully');
                // Reset form or perform other actions upon successful upload
            } else {
                console.error('Failed to upload product!');
            }
        } catch (error) {
            console.error('Error uploading product:', error);
        }
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

    // Rest of your component code...

    return (
        <div>
            <PartnerSidebarNavbar />
            <div>
                <div class="AddProductHeader">
                    <h2>Add Product</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Add image upload button */}
                    <label htmlFor="imageFile">Image:</label>
                    <input type="file" id="imageFile" accept="image/*" onChange={handleImageChange} />
                    <br />

                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <br />

                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <br />

                    <label htmlFor="productLink">Link:</label>
                    <input type="text" id="link" value={link} onChange={(e) => setProductLink(e.target.value)} />
                    <br />

                    <label htmlFor="productInfo">Description:</label>
                    <br />
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <br />

                    <label htmlFor="category">Category:</label>
                    <Select id="category" name="category" options={category} isMulti onChange={handleCategoryChange} />
                    <br />

                    <label htmlFor="subCategory">Sub-Category:</label>
                    <Select id="subCategory" name="subCategory" options={subCategory} isMulti onChange={handleSubCategoryChange} />
                    <br />

                    <label htmlFor="tags">Tags:</label>
                    <Select id="tags" name="tags" options={addptagOptions} isMulti onChange={handleTagsChange} />
                    <br />

                    <button type="submit">Upload</button>
                </form>
            </div>
            <PartnerFooter/>
        </div>
    );
}

export default AddProduct;
