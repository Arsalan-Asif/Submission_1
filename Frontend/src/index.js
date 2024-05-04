import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AddToCartProvider } from './context/AddToCartContext';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AddToCartProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </AddToCartProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
