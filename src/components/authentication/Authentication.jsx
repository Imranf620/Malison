import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";

const Authentication = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const userDetails = useContext(UserContext); // Use updateUserDetails from UserContext

  const navigate = useNavigate();
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const formData = new FormData(form);
      const response = await fetch(
        isSignIn ? `/api/auth/login` : `/api/auth/register`,
        {
          method: "POST",
          body: JSON.stringify(Object.fromEntries(formData)), // Convert FormData to JSON
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);

        toast.success(
          isSignIn ? "Logged in successfully" : "Created account successfully"
        );

        if (isSignIn) {
          const { isAdmin, _id, ...userData } = data; // Extract user ID (_id)
          // Update user details in context with isAdmin field and user ID
          userDetails.updateUserDetails({ ...userData, isAdmin, userId: _id }, () => {
              console.log("User details context:", userDetails.userDetails);
              navigate("/welcome");
          });
      }

        toggleForm();
      } else {
        const errorMessage = await response.json(); // Extract error message from response
        console.error("Server Error:", errorMessage);
        // Set the warning message state with the error message
        toast.error(errorMessage.message || "Server error");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 transition-all duration-500">
          {isSignIn ? (
            <>
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                  Sign In
                </h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Username"
                    name="username" // Add name attribute for form data
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Password"
                    name="password" // Add name attribute for form data
                  />
                </div>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign In
                </button>
              </form>

              <div className="flex items-center justify-between">
                <button
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  onClick={toggleForm}
                >
                  Create Account
                  <br />
                </button>
                <a href="" style={{ marginTop: "0px", marginLeft: "30%" }}>
                  Login as an Admin{" "}
                </a>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                  Sign Up
                </h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="username"
                    placeholder="Username"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </div>

                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign Up
                </button>
              </form>

              <div className="flex items-center justify-between">
                <button
                  className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
                  onClick={toggleForm}
                >
                  Already have an account? Sign In
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
