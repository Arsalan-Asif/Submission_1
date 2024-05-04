import React, { createContext, useState, useContext } from 'react';

const AddToCartContext = createContext();

export const AddToCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item, quantity) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex] = {
                ...updatedCartItems[existingItemIndex],
                quantity: updatedCartItems[existingItemIndex].quantity + quantity
            };
            setCartItems(updatedCartItems);
        } else {
            setCartItems(prevItems => [...prevItems, { ...item, quantity: quantity }]);
        }
    };

    const decrementQuantity = (itemId) => {
        const updatedCartItems = cartItems.map(item =>
            item.id === itemId && item.quantity > 0
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );

        const updatedCartItemsWithoutZeroQuantity = updatedCartItems.filter(item => item.quantity !== 0);

        setCartItems(updatedCartItemsWithoutZeroQuantity);
    };

    const incrementQuantity = (itemId) => {
        const updatedCartItems = cartItems.map(item =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCartItems);
    };

    const removeFromCart = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
    };

    return (
        <AddToCartContext.Provider value={{ cartItems, setCartItems, addToCart, decrementQuantity, incrementQuantity, removeFromCart }}>
            {children}
        </AddToCartContext.Provider>
    );
};

export const useAddToCart = () => useContext(AddToCartContext);
