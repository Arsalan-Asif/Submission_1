import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from '../context/ProductContext';
import Header from '../components/Header';
import { useAddToCart } from '../context/AddToCartContext';
import AddToCartModal from '../components/AddToCartModal';

function Product() {
    const [user, setUser] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { selectedProduct } = useContext(ProductContext);
    const { addToCart } = useAddToCart();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isAdded, setIsAdded] = useState(false)
    const [showModal, setShowModal] = useState(false);

    const onLogout = () => setUser(null);

    useEffect(() => {
        const email = localStorage.getItem("email");
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        const userExists = email && username && token && email !== "" && username !== "" && token !== "";
        const user = userExists ? { email, username, token } : null;
        setUser(user);
    }, []);

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setErrorMessage('');
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const showStandardSizes = () => {
        const clothingCategories = ["men's clothing", "women's clothing", "mens clothing", "womens clothing, clothing"];
        return clothingCategories.includes(selectedProduct.category);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            setErrorMessage('Please select a size.');
            return;
        }
        addToCart({ ...selectedProduct, size: selectedSize }, quantity);
        setSuccessMessage('Product added to cart!');
        setIsAdded(true)
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000); // Hide success message after 3 seconds
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            <Header user={user} onLogout={onLogout} count={isAdded ? quantity : 0} />
            <div className="container mx-auto mt-3">
                <Link to="/" className="text-white bg-orange-700 hover:bg-orange-800 w-20 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 self-start ml-5">Back</Link>
                <div className="flex">
                    {/* Image */}
                    <div className="w-80 h-80 m-3">
                        <img className="w-full h-full object-cover rounded border border-black" src={selectedProduct.image} alt={selectedProduct.title} />
                    </div>
                    {/* Product Details */}
                    <div className="w-2/3">
                        <h1 className="text-xl font-bold mb-4 mt-8 hover:text-orange-700">{selectedProduct.title}</h1>
                        <p className="mb-4 text-gray-700 font-bold hover:text-orange-700">Price: ${selectedProduct.price}</p>
                        <p className="mb-4 text-gray-700">{selectedProduct.description}</p>
                        {/* Select Size */}
                        <h2 className=" font-bold mb-2">Select Size</h2>
                        <div className="flex mt-2">
                            <div className="flex mt-2">
                                {showStandardSizes() ? (
                                    <>
                                        <div className={`w-8 h-8 bg-gray-300 rounded-full mr-2 cursor-pointer flex items-center justify-center hover:bg-orange-300 ${selectedSize === 'S' && 'border-2 border-orange-500'}`} onClick={() => handleSizeSelect('S')}>S</div>
                                        <div className={`w-8 h-8 bg-gray-300 rounded-full mr-2 cursor-pointer flex items-center justify-center hover:bg-orange-300 ${selectedSize === 'M' && 'border-2 border-orange-500'}`} onClick={() => handleSizeSelect('M')}>M</div>
                                        <div className={`w-8 h-8 bg-gray-300 rounded-full mr-2 cursor-pointer flex items-center justify-center hover:bg-orange-300 ${selectedSize === 'L' && 'border-2 border-orange-500'}`} onClick={() => handleSizeSelect('L')}>L</div>
                                        <div className={`w-8 h-8 bg-gray-300 rounded-full mr-2 cursor-pointer flex items-center justify-center hover:bg-orange-300 ${selectedSize === 'XL' && 'border-2 border-orange-500'}`} onClick={() => handleSizeSelect('XL')}>XL</div>
                                    </>
                                ) : (
                                    <div className={`w-8 h-8 bg-gray-300 rounded-full mr-2 cursor-pointer flex items-center justify-center hover:bg-orange-300 text-sm ${selectedSize === 'FREE' && 'border-2 border-orange-500'}`} onClick={() => handleSizeSelect('FREE')}>FREE</div>
                                )}
                            </div>
                        </div>
                        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                        {/* Quantity Selection */}
                        <h2 className="text-md font-bold mt-2">Quantity</h2>
                        <div className="flex items-center mt-4">
                            <button className="w-10 h-10 bg-gray-300 rounded-full mr-2 focus:outline-none hover:bg-orange-300" onClick={decrementQuantity}>-</button>
                            <div className="w-6 h-12 flex items-center justify-center">{quantity}</div>
                            <button className="w-10 h-10 bg-gray-300 rounded-full ml-2 focus:outline-none hover:bg-orange-300" onClick={incrementQuantity}>+</button>
                        </div>
                        {/* Add to Cart Button */}
                        <div className="flex items-center mt-4">
                            <button
                                onClick={handleAddToCart}
                                className="bg-orange-700 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                            >
                                Add to Cart

                            </button>
                            <AddToCartModal isOpen={showModal} onClose={handleCloseModal} />
                            {successMessage && <p className="text-green-500 ml-2">{successMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
