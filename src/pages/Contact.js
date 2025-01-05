import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem
} from "@mui/material";

const countryCodeData = [
  { code: "+91", flag: "🇮🇳", maxLength: 10, label: "IN +91" },
  { code: "+1", flag: "🇺🇸", maxLength: 10, label: "US +1" },
  { code: "+44", flag: "🇬🇧", maxLength: 10, label: "UK +44" },
  // Add more countries as needed
];

const Contact = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState(countryCodeData[0].code);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [step, setStep] = useState(1); // Step 1: Name & Mobile, Step 2: OTP

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
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
    if (step === 1) {
      if (name.trim().length < 3) {
        alert("Name must be at least 3 characters long.");
        return;
      }
      const selectedCountry = countryCodeData.find((item) => item.code === countryCode);
      const maxLength = selectedCountry ? selectedCountry.maxLength : 10;

      if (mobileNumber.length !== maxLength) {
        alert(`Please enter a valid ${maxLength}-digit mobile number.`);
        return;
      }

      alert(`OTP sent to ${countryCode} ${mobileNumber}`);
      setStep(2); // Move to OTP step
    } else if (step === 2) {
      if (otp.some((value) => value === "")) {
        alert("Please enter the full OTP.");
        return;
      }

      alert("Details submitted successfully!");
      setStep(1); // Reset form after submission
      setName("");
      setMobileNumber("");
      setOtp(["", "", "", ""]);
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "400px",
        margin: "auto",
        marginTop: "50px",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>

      {step === 1 && (
        <>
          <TextField
            fullWidth
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              sx={{ marginRight: 1 }}
            >
              {countryCodeData.map((item) => (
                <MenuItem key={item.code} value={item.code}>
                  {item.flag} {item.label}
                </MenuItem>
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
          >
            Next
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <Typography variant="body1" gutterBottom>
            Enter the OTP sent to {countryCode} {mobileNumber}
          </Typography>
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleNextStep}
          >
            Submit
          </Button>
        </>
      )}
    </Box>
  );
};

export default Contact;
