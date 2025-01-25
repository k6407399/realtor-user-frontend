import React from "react";
import { Box, IconButton } from "@mui/material";
import { Share } from "@mui/icons-material";

const ShareIcon = ({ property }) => {
  const handleShare = async () => {
    const shareData = {
      title: `Check out this property: ${property.title || "Property Listing"}`,
      text: `Here's a great property located at ${property.location}. Take a look!`,
      url: window.location.href, // Share the current page URL
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert("Sharing is not supported in your browser. Please copy the URL manually.");
      }
    } catch (err) {
      console.error("Error while sharing:", err);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "10px",
        right: "10px",
        color: "white",
      }}
    >
      <IconButton onClick={handleShare}>
        <Share />
      </IconButton>
    </Box>
  );
};

export default ShareIcon;
