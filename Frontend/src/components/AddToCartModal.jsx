import React from "react";
import { Link } from "react-router-dom";

const AddToCartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white w-96 p-6 rounded-md flex flex-col items-center relative">
        <button
          className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4 mt-2 text-black">
          This item has been added to Cart !!!
        </h2>
        <div className="flex">
          <Link
            to="/"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-400 mr-2"
          >
            OK
          </Link>
          <Link
            to="/cart"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-400"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
