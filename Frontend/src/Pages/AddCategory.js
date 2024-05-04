import React, { useState, useEffect } from 'react';
import AdminNav from '../components/admin/AdminNav';

const AddCategory = () => {
    const [category, setCategory] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:4010/admin/categories');
            if (response.ok) {
                const data = await response.json();
                setCategoriesList(data.map(cat => ({ ...cat, isEditing: false })));
            } else {
                throw new Error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (category.trim() === '') {
            setError('Category cannot be empty');
            setTimeout(() => {
                setError('');
            }, 3000);
            return;
        }
        try {
            const lowercaseCategories = categoriesList.map((cat) => cat.category.toLowerCase());
            const lowercaseCategory = category.toLowerCase();

            if (lowercaseCategories.includes(lowercaseCategory)) {
                setError('Category already available, cannot add duplicate');
                setTimeout(() => {
                    setError('');
                }, 3000);
            } else {
                const response = await fetch('http://localhost:4010/admin/add-category', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ category })
                });
                if (response.ok) {
                    setCategoriesList([...categoriesList, { category, isEditing: false }]);
                    setCategory('');
                    setSuccessMessage('Category added successfully');
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 3000);
                } else {
                    setSuccessMessage('Failed to add category');
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 3000);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setSuccessMessage('Failed to add category');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }
    };

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleEdit = (categoryId) => {
        const updatedCategoriesList = categoriesList.map(cat => {
            if (cat._id === categoryId) {
                return { ...cat, isEditing: true };
            }
            return cat;
        });
        setCategoriesList(updatedCategoriesList);
    };

    const handleEditChange = (event, categoryId) => {
        const updatedCategoriesList = categoriesList.map(cat => {
            if (cat._id === categoryId) {
                return { ...cat, category: event.target.value };
            }
            return cat;
        });
        setCategoriesList(updatedCategoriesList);
    };

    const handleEditSubmit = async (categoryId, newCategoryName) => {
        try {
            const response = await fetch(`http://localhost:4010/admin/edit-category/${categoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category: newCategoryName })
            });
            if (response.ok) {
                const updatedCategoriesList = categoriesList.map(cat => {
                    if (cat._id === categoryId) {
                        return { ...cat, isEditing: false };
                    }
                    return cat;
                });
                setCategoriesList(updatedCategoriesList);
                setSuccessMessage('Category updated successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            } else {
                setError('Failed to update category');
                setTimeout(() => {
                    setError('');
                }, 3000);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to update category');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };

    const handleEditCancel = (categoryId) => {
        const updatedCategoriesList = categoriesList.map(cat => {
            if (cat._id === categoryId) {
                return { ...cat, isEditing: false };
            }
            return cat;
        });
        setCategoriesList(updatedCategoriesList);
    };

    const handleDelete = async (categoryId) => {
        try {
            const response = await fetch(`http://localhost:4010/admin/delete-category/${categoryId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                const updatedCategoriesList = categoriesList.filter((cat) => cat._id !== categoryId);
                setCategoriesList(updatedCategoriesList);
                setSuccessMessage('Category deleted successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            } else {
                setError('Failed to delete category');
                setTimeout(() => {
                    setError('');
                }, 3000);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to delete category');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };

    return (
        <div>
            <AdminNav />
            <div className="container mx-auto mt-8">
                <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold mb-4">Add Category</h1>
                        <input
                            type="text"
                            className="border rounded-md px-3 py-2 w-full"
                            placeholder="Category"
                            value={category}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Add
                    </button>
                    {error && (
                        <span className="text-red-500 ml-2">{error}</span>
                    )}
                    {successMessage && (
                        <span className="text-green-500 ml-2">{successMessage}</span>
                    )}
                </form>

                <ul className="mt-4 flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4">Categories: </h2>
                    {categoriesList.map((cat) => (
                        <li key={cat._id} className='border border-gray-400 rounded-md p-2 my-1 w-2/5 flex justify-between'>
                            {cat.isEditing ? (
                                <div>
                                    <input
                                        type="text"
                                        value={cat.category}
                                        onChange={(event) => handleEditChange(event, cat._id)}
                                        autoFocus
                                    />
                                    <button onClick={() => handleEditSubmit(cat._id, cat.category)} className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md ml-1 mr-2">Save</button>
                                    <button onClick={() => handleEditCancel(cat._id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md">Cancel</button>
                                </div>
                            ) : (
                                <span>{cat.category}</span>
                            )}
                            <div>
                                <button onClick={() => handleEdit(cat._id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md mr-2">Edit</button>
                                <button onClick={() => handleDelete(cat._id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddCategory;
