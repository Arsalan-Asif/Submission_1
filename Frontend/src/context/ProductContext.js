import React, { createContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct, cart, addToCart }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
