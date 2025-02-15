import React from "react";
import { Box, IconButton, Button } from "@mui/material";
import { Favorite, ThumbUp } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";

const PropertyActions = ({
  toggleFavorite,
  handleLike,
  openModal,
  favorites,
  liked,
  userLoggedIn,
  openLoginModal,
}) => {
  const handleFavoriteClick = () => {
    if (!userLoggedIn) {
      openLoginModal();
    } else {
      toggleFavorite();
    }
  };

  const handleLikeClick = () => {
    if (!userLoggedIn) {
      openLoginModal();
    } else {
      handleLike();
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "10px",
        left: "10px",
        right: "10px",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {/* WhatsApp Icon with Group Link */}
      <IconButton
        component="a"
        href="https://chat.whatsapp.com/YOUR-GROUP-LINK" // Replace with actual WhatsApp group link
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          width: "35px",
          height: "35px",
          borderRadius: "5px",
          border: "1px solid white",
          color: "#25D366",
        }}
      >
        <WhatsAppIcon />
      </IconButton>

      {/* Show Details Button */}
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={openModal}
        sx={{
          fontSize: "10px",
          textTransform: "capitalize",
          height: "30px",
          lineHeight: "normal",
        }}
      >
        Show Details
      </Button>

      {/* Facebook Icon with Page/Group Link */}
      <IconButton
        component="a"
        href="https://www.facebook.com/YOUR-FACEBOOK-PAGE" // Replace with actual Facebook page/group link
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          width: "35px",
          height: "35px",
          borderRadius: "5px",
          border: "1px solid white",
          color: "#4267B2",
        }}
      >
        <FacebookIcon />
      </IconButton>

      {/* Like & Wishlist Icons (Commented Out) */}
      {/* 
      <IconButton
        onClick={handleFavoriteClick}
        sx={{
          width: "35px",
          height: "35px",
          borderRadius: "5px",
          border: "1px solid white",
          color: favorites ? "red" : "white",
        }}
      >
        <Favorite />
      </IconButton>

      <IconButton
        onClick={handleLikeClick}
        sx={{
          width: "35px",
          height: "35px",
          borderRadius: "5px",
          border: "1px solid white",
          color: liked ? "blue" : "white",
        }}
      >
        <ThumbUp />
      </IconButton> 
      */}
    </Box>
  );
};

export default PropertyActions;
