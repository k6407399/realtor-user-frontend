import React from "react";
import { Box } from "@mui/material";
import UserSidebar from "./UserSidebar";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/user/Profile"; // Import Profile
import MyListings from "../pages/user/MyListings"; // Example for other routes
import Appointments from "../pages/user/Appointments"; // Example

const UserDashboardLayout = ({ setIsLoggedIn }) => {
  return (
    <Box display="flex" minHeight="97vh" bgcolor="grey.100">
      <UserSidebar setIsLoggedIn={setIsLoggedIn} />
      <Box flexGrow={1} p={3}>
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="my-listings" element={<MyListings />} />
          <Route path="appointments" element={<Appointments />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default UserDashboardLayout;
