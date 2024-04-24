import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import { SelectedCardContext } from "../../context/pricingContext";
import SelectedCardDetails from "../../components/selectedCardDetails/selectedCardDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Navbar = () => {
  const userDetails = useContext(UserContext);

  const { selectedCardId } = useContext(SelectedCardContext); // Access selectedCardId from context



  console.log("Selected Card ID:", selectedCardId); // Log selectedCardId
  const logout = () => {
    localStorage.removeItem("userDetails"); // Correct key name
    toast.success("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/"; // Delay redirect to give the toast time to display
    }, 1500); // Adjust timeout as needed
  };
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/welcome" className="text-white">
                Your Logo
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/welcome"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </Link>
                <Link
                  to="/price"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Price
                </Link>
                {userDetails.userDetails.isAdmin && (
                  <Link
                    to="/dashboard"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={logout }
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const WelcomePage = () => {
  const userDetails = useContext(UserContext);
  const { selectedCardId } = useContext(SelectedCardContext);
  const [showPlanDetails, setShowPlanDetails] = useState(false);

  const togglePlanDetails = () => {
    setShowPlanDetails(!showPlanDetails);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden w-full">
        <div className="px-6 py-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Welcome {userDetails.userDetails.username}
            </h1>
            <p className="text-lg text-gray-600">
              This is your welcome page. Feel free to customize it!
            </p>
            {!showPlanDetails && (
              <button
                onClick={togglePlanDetails}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Show Plan
              </button>
            )}
            {showPlanDetails && (
              <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                <SelectedCardDetails
                  selectedCardId={selectedCardId}
                  onCancel={togglePlanDetails}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Welcome = () => {
  return (
    <div>
      <Navbar />
      <WelcomePage />
    </div>
  );
};

export default Welcome;
