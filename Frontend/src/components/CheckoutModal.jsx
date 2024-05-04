import React from "react";
import { Link } from "react-router-dom/dist";

const CheckoutModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white w-96 p-6 rounded-md">
        <h2 className="text-xl font-bold mb-4 text-black">
          Your order has been successfully placed !!!
        </h2>
        <img
          className="w-32 h-18 mx-auto mt-4 mb-6"
          src="./imgs/shopping.png"
          alt="Company Logo"
        />
        <Link
          to="/"
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-400"
        >
          OK
        </Link>
      </div>
    </div>
  );
};

export default CheckoutModal;
