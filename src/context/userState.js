import React, { useState, useEffect } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
  const [userDetails, setUserDetails] = useState(() => {
    // Load user details from localStorage on initial render
    const storedUserDetails = localStorage.getItem("userDetails");
    return storedUserDetails ? JSON.parse(storedUserDetails) : {
      userName: "",
      password: "",
      email: "",
      isAdmin:"",
      userId: "" // Add userId field to store user ID
    };
  });

  useEffect(() => {
    // Save user details to localStorage whenever userDetails changes
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  const updateUserDetails = (newUserDetails, callback) => {
    setUserDetails(newUserDetails);
    if (typeof callback === 'function') {
      callback();
    }
  };
  
  return (
    <UserContext.Provider value={{ userDetails, updateUserDetails }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
