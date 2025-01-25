// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SignupSigninModal from "./components/navbar/SignupSigninModal";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserDashboardLayout from "./components/UserDashboardLayout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");

  // Check login status on app load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  // Open login/signup modal
  const openLoginModal = () => {
    setIsModalOpen(true);
  };

  // Close login/signup modal
  const closeLoginModal = () => {
    setIsModalOpen(false);
  };

  // Handle login success
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  const handleBuyMenuFilter = (type) => {
    setPropertyTypeFilter(type);
  };

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        openLoginModal={openLoginModal}
        handleBuyMenuFilter={handleBuyMenuFilter}
      />

      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={<Home isLoggedIn={isLoggedIn} propertyTypeFilter={propertyTypeFilter} />}
        />

        {/* About Route */}
        <Route path="/about" element={<About />} />

        {/* Contact Route */}
        <Route path="/contact" element={<Contact />} />

        {/* User Dashboard Route */}
        <Route
          path="/dashboard/*"
          element={
            <UserDashboardLayout
              setIsLoggedIn={setIsLoggedIn}
              openLoginModal={openLoginModal}
            />
          }
        />
      </Routes>

      {/* Login/Signup Modal */}
      <SignupSigninModal
        isModalOpen={isModalOpen}
        onClose={closeLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />

      <Footer />
    </Router>
  );
}

export default App;