import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import axios from "axios";

function ProductList({ product, user }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortDropdown, setSortDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [originalProducts, setOriginalProducts] = useState([]);
  const { setSelectedProduct } = useContext(ProductContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    // Save the original order of products
    setOriginalProducts([...product]);

    // Fetch categories when component mounts
    fetchCategories();
  }, [product]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4010/admin/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category === "view all" ? null : category);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleSortDropdown = () => {
    setSortDropdown(!sortDropdown);
  };

  const handleSortChange = (option) => {
    setSelectedSortOption(option);
    setSortDropdown(false);
    if (option === "default") {
      setSelectedCategory(null);
      setSelectedSortOption("");
    }
  };

  const sortedProducts = () => {
    if (selectedSortOption === "lowToHigh") {
      return [...product].sort((a, b) => a.price - b.price);
    } else if (selectedSortOption === "highToLow") {
      return [...product].sort((a, b) => b.price - a.price);
    } else if (selectedSortOption === "alphabeticallyAZ") {
      return [...product].sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSortOption === "alphabeticallyZA") {
      return [...product].sort((a, b) => b.title.localeCompare(a.title));
    } else {
      return product;
    }
  };

  const filteredProducts = selectedCategory
    ? sortedProducts().filter((item) => item.category === selectedCategory)
    : sortedProducts();

  return (
    <div>
      <header className="h-auto w-full">
        <img
          className="w-full hidden md:block"
          src="./imgs/bcd.jpg"
          alt="error"
        />
        <img className="w-full md:hidden" src="./imgs/abc.jpg" alt="error" />
      </header>

      {user && (
        <>
          <div className="w-full h-auto flex flex-wrap flex-col p-6 items-center text-center">
            <div className="w-full h-auto flex flex-wrap flex-col items-center text-center">
              <p className="text-orange-700 font-bold text-3xl md:text-4xl">
                Our Products
              </p>
              <div className="w-36 h-1 border-b-4 border-black rounded-xl mt-4 md:mt-4 mb-12"></div>
            </div>
          </div>

          <div className="relative z-10">
            <button
              className="text-white bg-orange-700 hover:bg-orange-600 -z-50 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 ml-4 mb-4 focus:outline-none"
              onClick={toggleDropdown}
            >
              Filter
            </button>
            {showDropdown && (
              <ul className="absolute bg-white rounded-md shadow-lg py-1 w-48 left-0">
                {categories.map((category) => (
                  <li key={category._id}>
                    <button
                      className="block px-4 py-1 text-black hover:bg-orange-200 w-full text-left text-sm"
                      onClick={() =>
                        filterProductsByCategory(category.category)
                      }
                    >
                      {category.category}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {/* Sort dropdown */}
            <button
              className="text-white bg-orange-700 hover:bg-orange-600 -z-50 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 ml-4 mb-4 focus:outline-none"
              onClick={toggleSortDropdown}
            >
              Sort By
            </button>
            {sortDropdown && (
              <ul className="absolute bg-white rounded-md shadow-lg py-1 w-48 left-0">
                <li>
                  <button
                    className="block px-4 py-1 text-black hover:bg-orange-200 w-full text-left text-sm"
                    onClick={() => handleSortChange("default")}
                  >
                    Default
                  </button>
                </li>
                <li>
                  <button
                    className="block px-4 py-1 text-black hover:bg-orange-200 w-full text-left text-sm"
                    onClick={() => handleSortChange("lowToHigh")}
                  >
                    Price: Low to High
                  </button>
                </li>
                <li>
                  <button
                    className="block px-4 py-1 text-black hover:bg-orange-200 w-full text-left text-sm"
                    onClick={() => handleSortChange("highToLow")}
                  >
                    Price: High to Low
                  </button>
                </li>
                <li>
                  <button
                    className="block px-4 py-1 text-black hover:bg-orange-200 w-full text-left text-sm"
                    onClick={() => handleSortChange("alphabeticallyAZ")}
                  >
                    Alphabetically: A-Z
                  </button>
                </li>
                <li>
                  <button
                    className="block px-4 py-1 text-black hover:bg-orange-200 w-full text-left text-sm"
                    onClick={() => handleSortChange("alphabeticallyZA")}
                  >
                    Alphabetically: Z-A
                  </button>
                </li>
              </ul>
            )}
          </div>
        </>
      )}

      {/* Conditionally render the login section */}
      {!user && (
        <div className="flex-1 flex items-center justify-center text-orange-700 mt-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Login Required!</h2>
            <p className="text-lg text-gray-600">
              You are not logged in, Login to start Shopping!
            </p>
            <img
              className="w-32 h-18 mx-auto mt-4"
              src="./imgs/shopping.png"
              alt="Company Logo"
            />
            <Link
              to="/login"
              className="bg-orange-700 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer mt-4 block w-40 mx-auto"
            >
              Login
            </Link>
            <p className="text-lg text-gray-600">Happy Shopping!</p>
          </div>
        </div>
      )}

      {user && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center mt-4">
          {filteredProducts.map((productItem) => (
            <div
              key={productItem.id}
              className="w-56 rounded-lg overflow-hidden shadow-lg bg-white p-2 m-2 relative flex flex-col"
            >
              <Link
                to={`/product/${productItem.id}`}
                className="mb-2 overflow-hidden flex justify-center"
                onClick={() => setSelectedProduct(productItem)}
              >
                <img
                  className="w-44 h-44 object-contain"
                  src={productItem.image}
                  alt=""
                />
              </Link>
              <Link
                to={`/product/${productItem.id}`}
                className="text-center font-bold text-sm mb-1 hover:underline"
                onClick={() => setSelectedProduct(productItem)}
              >
                {productItem.title}
              </Link>

              <div className="mt-auto text-center">
                <div className="text-gray-900 font-bold mb-1 hover:text-red-600">
                  Price: ${productItem.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <aside className="relative text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
        <div className="relative z-10 max-w-screen-xl sm:py-24 mx-auto sm:px-6 lg:px-8">
          <div className=" max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
            <h2 className="text-4xl font-bold sm:text-5xl">
              Download Our App Now
            </h2>
            <Link
              className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
              to="/"
            >
              <svg
                fill="white"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
              </svg>
              &nbsp; Download now
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
          <img
            className="w-96"
            src="https://c4.wallpaperflare.com/wallpaper/970/90/388/girl-laptop-shopping-white-background-wallpaper-preview.jpg"
            alt="image1"
          />
        </div>
      </aside>
    </div>
  );
}

export default ProductList;
