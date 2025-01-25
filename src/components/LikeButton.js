import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import axios from "../api/axios";
import routesConfig from "../config/routesConfig";

const LikeButton = ({ propertyId, propertyType, isLiked, likeId, isLoggedIn, openLoginModal }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    try {
      if (liked) {
        await axios.delete(routesConfig.likes.remove.replace(":id", likeId), {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        setLiked(false);
      } else {
        const response = await axios.post(
          routesConfig.likes.add,
          { propertyId, propertyType },
          { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
        );
        setLiked(true);
        propertyId = response.data.like.id;
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
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
  );
};

export default LikeButton;
