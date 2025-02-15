import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import SignupSigninModal from "./SignupSigninModal";
// import BuyMenu from "./BuyMenu"; // Commented out as requested
import SellMenu from "./SellMenu";
// import SearchBar from "./SearchBar"; // Commented out as requested

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  // const [anchorElBuy, setAnchorElBuy] = React.useState(null); // Commented out Buy Menu logic
  const [anchorElSell, setAnchorElSell] = React.useState(null);
  const [notification, setNotification] = React.useState({
    open: false,
    type: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
    setNotification({
      open: true,
      type: "success",
      message: "Logged out successfully.",
    });
  };

  // Commented out search functionality as requested
  /*
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setNotification({
        open: true,
        type: "info",
        message: `Searching for: ${searchQuery}`,
      });
    } else {
      setNotification({
        open: true,
        type: "error",
        message: "Search query cannot be empty.",
      });
    }
  };
  */

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginRight: 3, cursor: "pointer" }}
          component={Link}
          to="/"
          color="inherit"
        >
          Realtor
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, gap: 2 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
          {/* <BuyMenu
            anchorEl={anchorElBuy}
            setAnchorEl={setAnchorElBuy}
            handleBuyMenuFilter={handleBuyMenuFilter}
          /> */} 
          {/* Commented out Buy Menu Section */}

          <SellMenu anchorEl={anchorElSell} setAnchorEl={setAnchorElSell} />
          <Link
            to="/about"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Contact Us
          </Link>
        </Box>

        {/* Commented out SearchBar section */}
        {/* 
        <Box sx={{ flexGrow: 1, maxWidth: 400, marginRight: 3 }}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchSubmit={handleSearchSubmit}
          />
        </Box>
        */}

        {isLoggedIn ? (
          <UserMenu handleLogout={handleLogout} />
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsModalOpen(true)}
            sx={{ fontWeight: "bold", textTransform: "capitalize" }}
          >
            Signup/Signin
          </Button>
        )}
      </Toolbar>

      <SignupSigninModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={() => setIsLoggedIn(true)}
      />

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.type}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default Navbar;
