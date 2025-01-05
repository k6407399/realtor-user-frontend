import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
  InputBase,
  Modal,
  TextField,
  Select,
  MenuItem as DropdownItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Country Code Data
const countryCodeData = [
  { code: "+91", flag: "🇮🇳", maxLength: 10, label: "IN +91" },
  { code: "+1", flag: "🇺🇸", maxLength: 10, label: "US +1" },
  { code: "+44", flag: "🇬🇧", maxLength: 10, label: "UK +44" },
  // Add more country codes as needed
];

const Navbar = () => {
  const [anchorElBuy, setAnchorElBuy] = useState(null);
  const [anchorElSell, setAnchorElSell] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState(countryCodeData[0].code);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [step, setStep] = useState(1); // Step 1: Mobile Number, Step 2: OTP
  const [username, setUsername] = useState("");

  const handleMenuOpen = (setAnchorFn) => (event) => {
    setAnchorFn(event.currentTarget);
  };

  const handleMenuClose = (setAnchorFn) => () => {
    setAnchorFn(null);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const toggleSignupLogin = () => {
    setIsSignup((prev) => !prev);
    setStep(1);
    setOtp(["", "", "", ""]);
    setMobileNumber("");
    setUsername("");
  };

  const handleMobileNumberChange = (e) => {
    const selectedCountry = countryCodeData.find((item) => item.code === countryCode);
    const maxLength = selectedCountry ? selectedCountry.maxLength : 10;
    const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= maxLength) {
      setMobileNumber(value);
    }
  };

  const handleNextStep = () => {
    const selectedCountry = countryCodeData.find((item) => item.code === countryCode);
    const maxLength = selectedCountry ? selectedCountry.maxLength : 10;

    if (step === 1) {
      if (isSignup && username.trim().length < 3) {
        alert("Username must be at least 3 characters long.");
        return;
      }
      if (mobileNumber.length !== maxLength) {
        alert(`Please enter a valid ${maxLength}-digit mobile number.`);
        return;
      }

      alert(`OTP sent to ${countryCode} ${mobileNumber}`);
      setStep(2); // Move to OTP step
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setMobileNumber("");
    setOtp(["", "", "", ""]);
    setStep(1);
    setUsername("");
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          {/* RealtorApp Logo */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", cursor: "pointer", marginRight: 2 }}
          >
            RealtorApp
          </Typography>

          {/* Navigation Buttons */}
          <Button color="inherit">Home</Button>

          {/* BUY Dropdown */}
          <Box
            onMouseEnter={handleMenuOpen(setAnchorElBuy)}
            onMouseLeave={handleMenuClose(setAnchorElBuy)}
          >
            <Button color="inherit" endIcon={<ArrowDropDownIcon />}>
              BUY
            </Button>
            <Menu
              anchorEl={anchorElBuy}
              open={Boolean(anchorElBuy)}
              onClose={handleMenuClose(setAnchorElBuy)}
            >
              <MenuItem onClick={handleMenuClose(setAnchorElBuy)}>Land/Site</MenuItem>
              <MenuItem onClick={handleMenuClose(setAnchorElBuy)}>Flats</MenuItem>
              <MenuItem onClick={handleMenuClose(setAnchorElBuy)}>Villas</MenuItem>
              <MenuItem onClick={handleMenuClose(setAnchorElBuy)}>Apartment Buildings</MenuItem>
            </Menu>
          </Box>

          {/* SELL Dropdown */}
          <Box
            onMouseEnter={handleMenuOpen(setAnchorElSell)}
            onMouseLeave={handleMenuClose(setAnchorElSell)}
          >
            <Button color="inherit" endIcon={<ArrowDropDownIcon />}>
              SELL
            </Button>
            <Menu
              anchorEl={anchorElSell}
              open={Boolean(anchorElSell)}
              onClose={handleMenuClose(setAnchorElSell)}
            >
              <MenuItem onClick={handleMenuClose(setAnchorElSell)}>Land/Site</MenuItem>
              <MenuItem onClick={handleMenuClose(setAnchorElSell)}>Flats</MenuItem>
              <MenuItem onClick={handleMenuClose(setAnchorElSell)}>Villas</MenuItem>
              <MenuItem onClick={handleMenuClose(setAnchorElSell)}>Apartment Buildings</MenuItem>
            </Menu>
          </Box>

          {/* Additional Navigation */}
          <Button color="inherit" href="/about">
          About
          </Button>
          <Button color="inherit" href="/contact">
          Contact
          </Button>

          {/* <Button color="inherit">Contact</Button>
          <Button color="inherit">About</Button> */}

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 1,
              paddingX: 1,
              marginRight: 2,
            }}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Signup/Signin Button */}
          <Button variant="contained" color="secondary" onClick={() => setIsModalOpen(true)}>
            Signup/Signin
          </Button>
        </Toolbar>
      </AppBar>

      {/* Modal for Signup/Login */}
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: 400,
            backgroundColor: "white",
            borderRadius: 2,
            padding: 3,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {isSignup ? "Register" : "Login"}
          </Typography>

          {step === 1 && (
            <>
              {isSignup && (
                <TextField
                  fullWidth
                  label="Username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              )}
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  sx={{ marginRight: 1 }}
                >
                  {countryCodeData.map((item) => (
                    <DropdownItem key={item.code} value={item.code}>
                      {item.flag} {item.label}
                    </DropdownItem>
                  ))}
                </Select>
                <TextField
                  fullWidth
                  placeholder="Enter Mobile Number"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleNextStep}
                disabled={mobileNumber.length !== countryCodeData.find((item) => item.code === countryCode).maxLength}
              >
                Next
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                {[...Array(4)].map((_, index) => (
                  <TextField
                    key={index}
                    id={`otp-${index}`}
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center", fontSize: "1.5rem" },
                    }}
                    sx={{ width: 50 }}
                  />
                ))}
              </Box>
              <Button variant="contained" color="primary" fullWidth>
                {isSignup ? "Register" : "Login"}
              </Button>
            </>
          )}

          <Typography
            sx={{ textAlign: "center", marginTop: 2, cursor: "pointer", color: "blue" }}
            onClick={toggleSignupLogin}
          >
            {isSignup ? "Already have an account? Login" : "Don't have an account? Register"}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
