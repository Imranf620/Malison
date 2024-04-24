import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userContext from "../../context/userContext";



const Navbar = () => {

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white">
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
               
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Dashboard = () => {


   // Access user details from context
   const userDetails = useContext(userContext);

  // State variables to store input values
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [subscription, setSubscription] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState(Array(3).fill("")); // Initialize features array with 3 empty strings

  // Function to handle form submission for Business plan
  const handleBusinessSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, userId } = userDetails.userDetails; // Destructure username and _id from userDetails context
  
      const response = await fetch('http://localhost:8800/api/price/createCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageName,
          price,
          subscription,
          description,
          features: features.filter(feature => feature.trim() !== ""), // Remove empty strings from features array
          username, // Include username
          userId // Include _id
        }),
        credentials: 'include', // Include cookies in the request
      });
      if (!response.ok) {
        throw new Error('Failed to create pricing plan');
      }
      // Show toast message for successful plan creation
      toast.success("Pricing plan created successfully");
      // Reset input fields after submission
      setPackageName("");
      setPrice("");
      setSubscription("");
      setDescription("");
      setFeatures(Array(3).fill("")); // Reset features array

      
    } catch (error) {
      console.error('Error:', error);
      toast.warn("Error:", error)
      // Optionally handle error here
    }
  };
  // Function to handle dynamic changes in features array
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  // Function to dynamically render input fields for features
  const renderFeatureInputs = () => {
    return features.map((feature, index) => (
      <div className="mb-4" key={index}>
        <input
          type="text"
          value={feature}
          onChange={(e) => handleFeatureChange(index, e.target.value)}
          className="w-full border rounded py-2 px-3"
          placeholder={`Feature ${index + 1}`}
          maxLength={100}
        />
      </div>
    ));
  };

  return (
    <>
    <Navbar/>
   
    <div className="flex flex-wrap justify-center h-screen">
 
      <div className="w-full md:w-1/2 lg:w-1/3 px-4">
      
        <div className="relative overflow-hidden rounded-[10px] border-2 border-stroke bg-white px-8 py-10 shadow-pricing dark:border-dark-3 dark:bg-dark-2 max-h-[100vh]">
        <h1 className="text-center mb-4 font-bold">Card Creation</h1>
          <form onSubmit={handleBusinessSubmit}>
         
            <div className="flex gap-8">

            <div className="mb-4">
              <input
                type="text"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="w-full border rounded py-2 px-3"
                placeholder="Package Name"
                maxLength={100}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border rounded py-2 px-3"
                placeholder="Price"
                maxLength={100}
                />
            </div>
                </div>
            <div className="mb-4">
              <input
                type="text"
                value={subscription}
                onChange={(e) => setSubscription(e.target.value)}
                className="w-full border rounded py-2 px-3"
                placeholder="Subscription"
                maxLength={100}
              />
            </div>
            <div className="mb-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded py-2 px-3"
                placeholder="Description"
                maxLength={100}
                />
            </div>
            {renderFeatureInputs()}
            <button
              type="submit"
              className="block w-full rounded-md border border-primary bg-primary text-black py-2 px-3 font-medium text-center transition hover:bg-opacity-90"
            >
              Save Business Plan
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
              </>
  );
};

export default Dashboard;
