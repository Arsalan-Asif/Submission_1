import React, { useState, useEffect } from 'react';
import AdminNav from '../components/admin/AdminNav';
import axios from 'axios';

const AddProduct = () => {
    const [img, setImg] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    function handleImg(e) {
        console.log(e.target.files);
        setImg(e.target.files[0]);
    }

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:4010/admin/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        if (!category || !title || !description || !price || !img) {
            setErrorMessage('Missing data in fields');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000); // 3 seconds
            return;
        }

        const formData = new FormData();
        formData.append('category', category);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', img);

        try {
            const response = await fetch("http://localhost:4010/create-product", {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log(data);
            setSuccessMessage('Product added successfully');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000); 

            setTitle('');
            setDescription('');
            setPrice('');
            setCategory('');
            setImg('');
            setErrorMessage('');
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage('Failed to add product');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000); 
        }
    };

    return (
        <div>
            <AdminNav />
            <div className="container mx-auto mt-8">
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
                    </div>
                    <div className="mb-4">
                        <select
                            id="category"
                            name="category"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category.category}>
                                    {category.category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Title"
                            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="Description"
                            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-700">$</span>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                placeholder="Price"
                                className="pl-10 w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                                min="0"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <input
                            type="file"
                            id="image"
                            name="image"
                            placeholder="Image"
                            onChange={handleImg}
                            // value={img}
                            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md relative"
                    >
                        Add
                    </button>
                    {errorMessage && (
                        <div className="mb-4 text-red-500">{errorMessage}</div>
                    )}
                    {successMessage && (
                        <div className="mb-4 text-green-500">{successMessage}</div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
