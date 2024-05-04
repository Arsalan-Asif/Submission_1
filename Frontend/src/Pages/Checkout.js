import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useAddToCart } from '../context/AddToCartContext';
import CheckoutModal from '../components/CheckoutModal';

const Checkout = () => {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const onLogout = () => setUser(null);
    const [formValid, setFormValid] = useState(false);
    const [formData, setFormData] = useState({
        email: '', newsSub: false, country: '',
        firstName: '', lastName: '', address: '',
        city: '', postalCode: '', phone: '', saveInfo: false
    });
    useEffect(() => {
        const email = localStorage.getItem("email");
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        const userExists = email && username && token && email !== "" && username !== "" && token !== ""
        const user = userExists ? { email, username, token } : null
        setUser(user)
    }, []);

    const { cartItems, setCartItems } = useAddToCart();

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shippingFee = 6;
    const total = subtotal + shippingFee;

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const orderData = {
            ...formData,
            cartItems: cartItems.map(item => ({
                title: item.title,
                image: item.image,
                price: item.price,
                size: item.size,
                quantity: item.quantity,
            })),
            subtotal: subtotal.toFixed(2),
            shippingFee: shippingFee.toFixed(2),
            total: total.toFixed(2),
            orderDateTime: new Date().toLocaleString()
        };
        try {
            const response = await fetch("http://localhost:4010/place-order", {
                method: 'POST',
                body: JSON.stringify(orderData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log(data)
            setCartItems([])
        } catch (error) {
            console.error("Error:", error);
        }
        setFormData({
            email: '', newsSub: false, saveInfo: false, country: '',
            firstName: '', lastName: '', address: '',
            city: '', postalCode: '', phone: ''
        });
        setShowModal(true);
    }

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const validateForm = () => {
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                if (key !== "newsSub" && key !== "saveInfo" && formData[key] === '') {
                    return false;
                }
            }
        }
        return true;
    };
    useEffect(() => {
        setFormValid(validateForm());
    }, [formData]);

    const isCartEmpty = cartItems.length === 0;
    return (
        <div>
            <Header user={user} onLogout={onLogout} />
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
                <div className="md:w-1/2 pr-4 md:pr-0 md:order-2">
                    <div className="bg-gray-100 p-6 rounded-md h-full">
                        <h2 className="text-xl font-semibold mb-2">Shopping Cart</h2>
                        {cartItems.length === 0 ? (
                            <h2 className="text-xl font-medium mb-4">No items in the cart!</h2>
                        ) : (
                            <>
                                {cartItems.map((item, index) => (
                                    <div className="flex items-center justify-between mb-4" key={index}>
                                        <img src={item.image} alt='productImage' className="w-20 h-20 mr-4" />
                                        <div>
                                            <p className="text-lg mb-1 justify-st">{item.title}</p>
                                            <p className="text-sm text-gray-600">Size: {item.size}</p>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="text-xl font-bold">${item.price}</p>
                                    </div>
                                ))}

                                <hr className='border-slate-300 w-120 ml-2' />
                                <div className="mb-1">
                                    <div className="rounded-md p-2 flex justify-between items-center">
                                        <div className="text-left">
                                            <p className="text-gray-700 font-semibold">Subtotal</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-700 font-bold">${subtotal.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <div className="rounded-md p-2 flex justify-between items-center">
                                        <div className="text-left">
                                            <p className="text-gray-700 font-semibold">Shipping Fee</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-700 font-bold">${shippingFee.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr className='border-slate-300 w-120 ml-2' />
                                <div className="mb-1">
                                    <div className="rounded-md p-2 flex justify-between items-center">
                                        <div className="text-left">
                                            <p className="text-gray-700 font-semibold">Total</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-700 font-bold">${total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr className='border-slate-300 w-120 ml-2' />
                            </>
                        )}
                    </div>
                </div>
                <div className="md:w-10/12 pl-4 md:pl-0 md:order-1">
                    <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto">
                        <h2 className="text-xl font-semibold mb-2 md: mt-6">Contact</h2>
                        <div className="flex items-center mb-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full h-10 px-4 py-2 border shadow-md sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mt-4 flex items-center mb-8">
                            <input
                                type="checkbox"
                                id="newsSub"
                                name="newsSub"
                                checked={formData.newsSub}
                                onChange={handleInputChange}
                                className="mr-2 rounded-sm border-gray-300"
                            />
                            <label className="text-sm font-medium text-gray-700">Email me with news and offers.</label>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <select
                                    className="w-full h-10 px-4 py-2 border shadow-md sm:text-sm border-gray-300 rounded-md"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Country</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                    <option value="United States of America">United States of America</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                </select>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full h-10 px-4 py-2 border shadow-md sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full h-10 px-4 py-2 border shadow-md sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full h-10 px-4 py-2 border shadow-md sm:text-sm border-gray-300 rounded-md"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full h-10 px-4 py-2 border shadow-md sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Postal Code"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        className="w-full h-10 px-4 py-2 border shadow-md sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full h-10 px-4 py-2 border shadow-md sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <input
                                type="checkbox"
                                id="saveInfo"
                                name="saveInfo"
                                checked={formData.saveInfo}
                                onChange={handleInputChange}
                                className="mr-2 rounded-sm border-gray-300"
                            />
                            <label className="text-sm font-medium text-gray-700">Save this information for next time</label>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2 mt-5">Shipping Method</h2>
                            <div className="border border-grey-700 rounded-md p-4 flex justify-between items-center">
                                <div className="text-left">
                                    <p className="text-gray-700 font-semibold">FLAT Shipping $5 + FBR POS Fee $1</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-700">$6</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                disabled={!formValid || isCartEmpty}
                                type="submit"
                                className="w-40 flex justify-center py-3 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white hover:bg-orange-500 bg-orange-700"
                            >
                                Place Order
                                <CheckoutModal isOpen={showModal} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
