import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField, Select, MenuItem, Snackbar, Alert } from "@mui/material";
import axios from "../../api/axios";
import routesConfig from "../../config/routesConfig";

const countryCodeData = [
  { code: "+91", maxLength: 10, label: "IN +91" },
  { code: "+1", maxLength: 10, label: "US +1" },
  { code: "+44", maxLength: 10, label: "UK +44" },
];

const SignupSigninModal = ({ isModalOpen, onClose, onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Mobile, Step 2: OTP
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP
  const [countryCode, setCountryCode] = useState(countryCodeData[0].code);
  const [username, setUsername] = useState("");
  const [notification, setNotification] = useState({ open: false, type: "", message: "" });

  // Reset the modal state when it is closed
  const handleClose = () => {
    setStep(1);
    setOtp(["", "", "", "", "", ""]);
    setMobileNumber("");
    setUsername("");
    setIsSignup(false);
    setNotification({ open: false, type: "", message: "" });
    onClose();
  };

  const handleNextStep = async () => {
    if (step === 1) {
      try {
        await axios.post(routesConfig.user.signup, {
          mobileNumber: `${countryCode}${mobileNumber}`,
          isSignup,
        });
        setStep(2);
        setNotification({ open: true, type: "success", message: "OTP sent successfully!" });
      } catch (error) {
        console.error("Error sending OTP:", error.response || error.message);
        const message =
          error.response?.data?.message || "Failed to send OTP. Try again later.";

        if (message.includes("already registered")) {
          setNotification({
            open: true,
            type: "warning",
            message: "This mobile number is already registered. Please login.",
          });
        } else {
          setNotification({ open: true, type: "error", message });
        }
      }
    } else if (step === 2) {
      try {
        const response = await axios.post(routesConfig.user.login, {
          mobileNumber: `${countryCode}${mobileNumber}`,
          code: otp.join(""),
          name: isSignup ? username : undefined,
        });
        localStorage.setItem("authToken", response.data.token);
        onLoginSuccess();
        handleClose(); // Close the modal and reset state
        setNotification({ open: true, type: "success", message: "Login successful!" });
      } catch (error) {
        console.error("Error verifying OTP:", error.response || error.message);
        setNotification({
          open: true,
          type: "error",
          message: "Invalid OTP. Please try again.",
        });
      }
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < otp.length - 1) document.getElementById(`otp-${index + 1}`).focus();
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ width: 400, backgroundColor: "white", borderRadius: 2, padding: 3 }}>
          {step === 1 ? (
            <>
              <Typography variant="h6">{isSignup ? "Register" : "Login"}</Typography>
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
              <Box sx={{ display: "flex", marginBottom: 2 }}>
                <Select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  sx={{ marginRight: 1 }}
                >
                  {countryCodeData.map((item) => (
                    <MenuItem key={item.code} value={item.code}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  fullWidth
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleNextStep}
                disabled={mobileNumber.length !== countryCodeData.find((item) => item.code === countryCode).maxLength}
              >
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6">Enter OTP</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                {[...Array(6)].map((_, index) => (
                  <TextField
                    key={index}
                    id={`otp-${index}`}
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    inputProps={{ maxLength: 1, style: { textAlign: "center", fontSize: "1.5rem" } }}
                    sx={{ width: 50 }}
                  />
                ))}
              </Box>
              <Button variant="contained" color="primary" fullWidth onClick={handleNextStep}>
                Verify OTP
              </Button>
            </>
          )}
          <Typography
            sx={{ textAlign: "center", marginTop: 2, cursor: "pointer", color: "blue" }}
            onClick={() => {
              setIsSignup(!isSignup);
              setStep(1);
              setOtp(["", "", "", "", "", ""]);
              setMobileNumber("");
              setUsername("");
            }}
          >
            {isSignup ? "Already have an account? Login" : "Don't have an account? Register"}
          </Typography>
        </Box>
      </Modal>

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
    </>
  );
};

export default SignupSigninModal;
