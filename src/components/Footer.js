import React, { useState } from "react";
import { Box, Typography, Link, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "600px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const closeButtonStyles = {
  position: "absolute",
  top: "10px",
  right: "10px",
  bgcolor: "red",
  color: "white",
  borderRadius: "50%",
  '&:hover': {
    bgcolor: "darkred",
  },
};

const Footer = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

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
        <Link
          component="button"
          onClick={() => setIsTermsOpen(true)}
          sx={{ color: "white", textDecoration: "none" }}
        >
          Terms of Service
        </Link>{" "}
        |{" "}
        <Link
          component="button"
          onClick={() => setIsPrivacyOpen(true)}
          sx={{ color: "white", textDecoration: "none" }}
        >
          Privacy Policy
        </Link>
      </Typography>

      {/* Terms of Service Modal */}
      <Modal open={isTermsOpen} onClose={() => setIsTermsOpen(false)}>
        <Box sx={modalStyles}>
          <IconButton
            onClick={() => setIsTermsOpen(false)}
            sx={closeButtonStyles}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" gutterBottom>
            Terms of Service
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to Realtor. By accessing or using our services, you agree to
            abide by these terms. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Proin volutpat nulla id lorem facilisis, nec
            elementum mauris fermentum.
          </Typography>
          <Typography variant="body1" paragraph>
            All disputes shall be governed by the laws of the jurisdiction in
            which the company is registered.
          </Typography>
        </Box>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal open={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)}>
        <Box sx={modalStyles}>
          <IconButton
            onClick={() => setIsPrivacyOpen(false)}
            sx={closeButtonStyles}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            At Realtor, we are committed to protecting your privacy. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mollis
            lectus et augue sodales, eget tristique velit consequat.
          </Typography>
          <Typography variant="body1" paragraph>
            We do not share your personal information with third parties unless
            required by law.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default Footer;
