import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import axios from "../api/axios";
import routesConfig from "../config/routesConfig";

const WishlistButton = ({ propertyId, propertyType, isWishlisted, wishlistId, isLoggedIn, openLoginModal }) => {
  const [wishlisted, setWishlisted] = useState(isWishlisted);

  const handleWishlistClick = async () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    try {
      if (wishlisted) {
        await axios.delete(routesConfig.wishlist.remove.replace(":id", wishlistId), {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        setWishlisted(false);
      } else {
        const response = await axios.post(
          routesConfig.wishlist.add,
          { propertyId, propertyType },
          { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
        );
        setWishlisted(true);
        wishlistId = response.data.wishlistItem.id;
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  return (
    <IconButton
      onClick={handleWishlistClick}
      sx={{
        width: "35px",
        height: "35px",
        borderRadius: "5px",
        border: "1px solid white",
        color: wishlisted ? "red" : "white",
      }}
    >
      <Favorite />
    </IconButton>
  );
};

export default WishlistButton;
