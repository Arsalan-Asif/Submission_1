import React from "react";
import { Link } from "react-router-dom/dist";

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white w-96 p-6 rounded-md">
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
        <h2 className="text-xl font-bold mb-4 text-black mt-2">
          Your query has been received !!!
        </h2>
        <h3 className="text-xl font-bold mb-4 text-black">
          We will get to you shortly !!!
        </h3>
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

export default ContactModal;
