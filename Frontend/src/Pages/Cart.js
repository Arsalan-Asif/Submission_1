import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useAddToCart } from '../context/AddToCartContext';

const Cart = () => {
    const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } = useAddToCart();
    const [user, setUser] = useState(null);
    const onLogout = () => setUser(null);

    useEffect(() => {
        const email = localStorage.getItem("email");
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        const userExists = email && username && token && email !== "" && username !== "" && token !== "";
        const user = userExists ? { email, username, token } : null;
        setUser(user);
    }, []);

    return (
        <div>
            <Header user={user} onLogout={onLogout} />
            <div className="flex flex-col justify-between h-full">
                <Link to="/"
                    className="text-white bg-orange-700 hover:bg-orange-800 w-20 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 self-start ml-5"
                >
                    Back
                </Link>

                {/* Render cart items */}
                {cartItems.length === 0 ? (
                    <div className="w-full h-auto flex flex-wrap flex-col items-center text-center mt-20">
                        <p className="text-orange-700  font-bold text-3xl md:text-4xl">
                            "There are no Items in your Cart"
                        </p>
                        <div className="w-36 h-1 border-b-4 border-black rounded-xl mt-4 md:mt-4 mb-12"></div>
                        <Link to="/"
                            className="w-48 bg-orange-700 hover:bg-orange-600 text-white font-bold py-2 px-4 self-center mr-2 mb-20"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="w-full h-auto flex flex-wrap flex-col p-6 items-center text-center">
                        <div className="w-full h-auto flex flex-wrap flex-col items-center text-center">
                            <p className="text-orange-700  font-bold text-3xl md:text-4xl">
                                "Items In Your Cart"
                            </p>
                            <div className="w-36 h-1 border-b-4 border-black rounded-xl mt-4 md:mt-4 mb-12"></div>
                        </div>
                    </div>
                )}

                <div className="p-4">
                    {/* Render cart items dynamically */}
                    {cartItems.map((item, index) => (
                        <div key={index} className="bg-orange-50 flex rounded-2xl items-center justify-between mb-4 border-b pb-4 h-30">
                            <div className="flex items-center w-2/5">
                                <img src={item.image} alt={item.title} className="w-16 h-16 rounded m-3 object-cover" />
                                <div>
                                    <p className="text-xl font-bold">{item.title}</p>
                                    <p className="text-md text-gray-700">Size: {item.size}</p>
                                </div>
                            </div>
                            <div className="w-1/4 flex items-center justify-center">
                                <button onClick={() => decrementQuantity(item.id)} className="bg-orange-600 hover:bg-orange-400 text-white font-extrabold py-2 px-4 rounded-full w-12 h-12 content-center transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer mr-2">-</button>
                                <span className="mr-2">{item.quantity}</span>
                                <button onClick={() => incrementQuantity(item.id)} className="bg-orange-600 hover:bg-orange-400 text-white font-extrabold py-2 px-4 rounded-full w-12 h-12 content-center transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer mr-2">+</button>

                                {/* Bin icon */}
                                <svg onClick={() => removeFromCart(item.id)} className="w-6 h-6 text-black cursor-pointer mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"></path>
                                </svg>
                            </div>
                            <div className="w-1/4 flex items-center justify-center">
                                <p className="text-gray-700 font-bold mr-2">Price:</p>
                                {/* Display the total price for the item */}
                                <span className="text-gray-700 font-xl font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Subtotal */}
                {cartItems.length > 0 && (
                    <div className="flex justify-end pr-20">
                        <p className="text-xl font-extrabold">
                            Subtotal: ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                        </p>
                    </div>
                )}

                {cartItems.length > 0 && (
                    <div className="flex flex-col mt-4 pr-16">
                        <p className="text-slate-500 py-2 self-end mr-2">
                            Taxes and Shipping Calculated at{' '}
                            <Link to="/checkout" className="underline cursor-pointer hover:text-orange-700">
                                Checkout.
                            </Link>
                        </p>
                        <Link
                            to="/checkout"
                            className="w-48 bg-orange-700 hover:bg-orange-600 text-center text-white font-bold py-2 px-4 mb-2 self-end mr-2"
                        >
                            Checkout
                        </Link>
                        <Link to="/"
                            className="w-48 bg-orange-700 hover:bg-orange-600 text-center text-white font-bold py-2 px-4 mb-2 self-end mr-2"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Cart;
