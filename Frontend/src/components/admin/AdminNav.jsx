import React, { useState } from "react";

function AdminNav() {
  const [authenticated, setAuthenticated] = useState(true);

  const logout = () => {
    // Remove user data from localStorage or any other authentication mechanism
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("contact_number");
    localStorage.removeItem("expires");
    localStorage.removeItem("httpOnly");
    localStorage.removeItem("role");

    // Update authentication status to false
    setAuthenticated(false);

    // Redirect to the login route
    window.location.href = "/login";
  };

  return (
    <div>
      <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        {authenticated && (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        )}
      </header>
      <nav className="bg-gray-200 py-4 px-6">
        <ul className="flex space-x-4">
          <li className="transition duration-300 ease-in-out transform hover:scale-105">
            <a
              href="/admin/add-category"
              className="py-2 px-4 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-300"
            >
              Add Category
            </a>
          </li>
          <li className="transition duration-300 ease-in-out transform hover:scale-105">
            <a
              href="/admin/add-product"
              className="py-2 px-4 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-300"
            >
              Add Product
            </a>
          </li>
          <li className="transition duration-300 ease-in-out transform hover:scale-105">
            <a
              href="/admin/orders"
              className="py-2 px-4 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-300"
            >
              Orders
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminNav;
