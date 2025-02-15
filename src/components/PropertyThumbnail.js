import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import MediaDisplay from "./MediaDisplay";
import PropertyActions from "./PropertyActions";
import PropertyModal from "./PropertyModal";
import ViewCount from "./ViewCount";
import ShareIcon from "./ShareIcon";
import axios from "../api/axios";
import routesConfig from "../config/routesConfig";

const PropertyThumbnail = ({ property, propertyType, userLoggedIn, openLoginModal }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [favorites, setFavorites] = useState(property.isWishlisted || false);
  const [liked, setLiked] = useState(property.isLiked || false);
  const [modalOpen, setModalOpen] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Define valid media URLs
  const backendStaticUrl = process.env.REACT_APP_BACKEND_URL.replace("/api/v1", "/static/");
  const validMedia = (property.media || []).filter(media => media.startsWith(backendStaticUrl));

  const toggleFavorite = async () => {
    try {
      if (favorites) {
        await axios.delete(`${routesConfig.wishlist.remove}/${property.wishlistId}`);
        setFavorites(false);
      } else {
        const response = await axios.post(routesConfig.wishlist.add, {
          propertyId: property.propertyId,
          propertyType,
        });
        setFavorites(true);
        property.wishlistId = response.data.wishlistItem.id;
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  const handleLike = async () => {
    try {
      if (liked) {
        await axios.delete(`${routesConfig.likes.remove}/${property.likeId}`);
        setLiked(false);
      } else {
        const response = await axios.post(routesConfig.likes.add, {
          propertyId: property.propertyId,
          propertyType,
        });
        setLiked(true);
        property.likeId = response.data.like.id;
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const openModal = async () => {
    setModalOpen(true);
    setLoadingDetails(true);

    try {
      const url = routesConfig.properties[propertyType]?.fetchById?.replace(":id", property.propertyId);
      const response = await axios.get(url);

      const singularPropertyType = propertyType === "land" ? "land" : propertyType.slice(0, -1);
      const propertyData = response.data[singularPropertyType];
      setPropertyDetails(propertyData || {});
    } catch (error) {
      console.error("Error fetching property details:", error);
      setPropertyDetails(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setPropertyDetails(null);
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "250px",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          backgroundColor: validMedia.length ? "#f9f9f9" : "rgba(0,0,0,0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {validMedia.length > 0 ? (
          <MediaDisplay
            media={validMedia}
            currentIndex={currentMediaIndex}
            setCurrentIndex={setCurrentMediaIndex}
          />
        ) : (
          <Typography sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}>
            No media available
          </Typography>
        )}
        <ViewCount count={property.viewCount || 100} />
        <ShareIcon property={property} />
        <PropertyActions
          toggleFavorite={toggleFavorite}
          handleLike={handleLike}
          openModal={openModal}
          favorites={favorites}
          liked={liked}
          userLoggedIn={userLoggedIn}
          openLoginModal={openLoginModal}
        />
      </Box>
      <PropertyModal
        modalOpen={modalOpen}
        closeModal={closeModal}
        loadingDetails={loadingDetails}
        propertyDetails={propertyDetails}
      />
    </>
  );
};

export default PropertyThumbnail;
