import { useContext } from "react";
import Dashboar from "../dashboard/Dashboar";
import userContext from "../../context/userContext";
import { Navigate } from "react-router-dom";


// Define a component to handle the protected Dashboard route
const ProtectedDashboard = () => {
    
    // Access the userDetails context
    const { userDetails } = useContext(userContext);
  
    // Check if the user is an admin
    const isAdmin = userDetails.isAdmin;
  
    // If user is not an admin, redirect to home page
    if (!isAdmin) {
      return <Navigate to="/" />;
    }
  
    // If user is an admin, render the Dashboard component
    return <Dashboar />;
  };

  export default ProtectedDashboard
  