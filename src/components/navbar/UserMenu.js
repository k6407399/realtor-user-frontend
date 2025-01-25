import React from "react";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";

const UserMenu = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => navigate("/dashboard/profile")}
      color="inherit"
      aria-label="User Dashboard"
    >
      <AccountCircle />
    </IconButton>
  );
};

export default UserMenu;
