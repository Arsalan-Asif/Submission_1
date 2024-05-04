import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Checkout from "./Pages/Checkout";
import Admin from "./Pages/Admin"
import AddCategory from "./Pages/AddCategory";
import AddProduct from "./Pages/AddProduct";
import Orders from "./Pages/Orders";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";

const App = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<About />} path="/about" />
      <Route element={<Contact />} path="/contact" />
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/register" />
      <Route element={<Checkout />} path="/checkout" />
      <Route element={<Admin />} path="/admin" />
      <Route element={<Cart />} path="/cart" />
      <Route element={<AddCategory />} path="/admin/add-category" />
      <Route element={<AddProduct />} path="/admin/add-product" />
      <Route element={<Orders />} path="/admin/orders" />
      <Route element={<Product />} path="/product/:id" />
    </Routes>
  );
};

export default App;
