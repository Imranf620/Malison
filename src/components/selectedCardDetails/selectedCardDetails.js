import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SelectedCardDetails = ({ selectedCardId, onCancel }) => {
  const [selectedCardDetails, setSelectedCardDetails] = useState(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/price/getSingleCard",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: selectedCardId }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch card details");
        }
        const data = await response.json();
        setSelectedCardDetails(data);
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    };

    if (selectedCardId) {
      fetchCardDetails();
    }
  }, [selectedCardId]);

  return (
    <div className="bg-gradient-to-r from-green-300 to-blue-300 p-6 rounded-xl shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl w-full max-w-2xl mx-auto overflow-hidden">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-3xl font-bold text-gray-900">Card Details</h2>
        <button
          onClick={onCancel}
          className="text-red-500 hover:text-red-700 p-2 transition-transform hover:rotate-90"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {selectedCardDetails ? (
        <div className="text-gray-900 text-base leading-7 overflow-y-auto">
          <p className="mb-2">
            <strong>Type:</strong> {selectedCardDetails.type}
          </p>
          <p className="mb-2">
            <strong>Price:</strong> ${selectedCardDetails.price}
          </p>
          <p className="mb-2">
            <strong>Subscription:</strong> {selectedCardDetails.subscription}
          </p>
          <p className="mb-2">
            <strong>Description:</strong> {selectedCardDetails.description}
          </p>
          <div className="mb-4">
            <strong>Features:</strong>
            <div className="mt-2 space-y-2 overflow-y-auto max-h-32">
              {selectedCardDetails.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white px-3 py-1 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <p>
            <strong>Created by:</strong> {selectedCardDetails.createdBy.username}
          </p>
        </div>
      ) : (
        <p className="text-gray-700">Loading card details...</p>
      )}

      <div className="mt-6 flex justify-between items-center">
        <Link
          to="/price"
          className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-5 rounded-lg transition-transform hover:-translate-y-1"
        >
          Choose Another Plan
        </Link>
        <button
          onClick={onCancel}
          className="text-indigo-600 hover:text-indigo-800 underline transition-transform hover:-translate-y-1"
        >
          Back to Pricing
        </button>
      </div>
    </div>
  );
};

export default SelectedCardDetails;
