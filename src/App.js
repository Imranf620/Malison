import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import PricePlan from "./pages/Priceplan/pricePlan"; // Corrected import and component name
import PaymentForm from "./pages/Payment/PaymentForm";
import Social from "./pages/social/Social";
import Success from "./pages/success/Success";
import Welcome from "./pages/welcomePage/Welcome";
import UserState from "./context/userState";

import PricingCards from "./pages/pricingCards/pricingCards";

import ProtectedDashboard from "./pages/ProtectedDashboard/ProtectedDashboard";
import ProtectedRoute from "./pages/PublicRoute/PublicRoute"; // Import the new protected route component
import { SelectedCardProvider } from "./context/pricingContext";

const App = () => {
  return (
    <SelectedCardProvider>
      <UserState>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* All other routes are protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/price" element={<PricingCards />} />
              <Route path="/payment" element={<PaymentForm />} />
              <Route path="/social" element={<Social />} />
              <Route path="/success" element={<Success />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/dashboard" element={<ProtectedDashboard />} />
            </Route>
          </Routes>
        </Router>
      </UserState>
    </SelectedCardProvider>
  );
};

export default App;
