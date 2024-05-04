import React from 'react';
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import FooterComponent from '../components/Footer';
import ProductList from '../components/ProductList';
import { useCart } from "../context/CartContext";

function Home() {
    const [product, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);

    const onLogout = () => setUser(null);

    const { addItemToCart } = useCart();

    // Check if user is logged in
    useEffect(() => {
        const email = localStorage.getItem("email");
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        const userExists = email && username && token && email !== "" && username !== "" && token !== "";
        const user = userExists ? { email, username, token } : null;
        setUser(user);
    }, []);

    // Fetching products if user is logged in
    useEffect(() => {
        if (user !== null) {
            fetchProducts();
        }
    }, [user]);

    // Function to fetch products
    const fetchProducts = () => {
        // fetch('http://localhost:4010/products')
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    };

    // Function to add product to cart
    const addToCart = (data) => {
        setCart([...cart, { ...data, quantity: 1 }]);
        addItemToCart(data); 
    };

    // Rendering JSX
    return (
        <div className="w-full mx-full ">
            <Header count={cart.reduce((acc, item) => acc + item.quantity, 0)} user={user} onLogout={onLogout} />

            <div className="w-full">
                <ProductList user={user} product={product} addToCart={addToCart} />
            </div>
            <FooterComponent />
        </div>
    );
}

export default Home;
