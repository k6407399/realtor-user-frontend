import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main", // Matches the Navbar color
        color: "white",
        textAlign: "center",
        padding: "10px 0",
        marginTop: "20px",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Realtor. All rights reserved.
      </Typography>
      <Typography variant="body2">
        <Link href="/terms" sx={{ color: "white", textDecoration: "none" }}>
          Terms of Service
        </Link>{" "}
        |{" "}
        <Link href="/privacy" sx={{ color: "white", textDecoration: "none" }}>
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
