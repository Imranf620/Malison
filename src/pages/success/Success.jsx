import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Success = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 5 seconds
    }, 1000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

  const handleClick = ()=>{
    navigate("/welcome")
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleClick}
          >
            Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Success;
