import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Divider,
} from "@mui/material";
import {
  Favorite,
  ThumbUp,
  Visibility,
  Share,
  Close,
  Phone,
} from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "../api/axios";
import routesConfig from "../config/routesConfig";

const PropertyThumbnail = ({ property, propertyType }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [likes, setLikes] = useState(0);
  const [favorites, setFavorites] = useState(false);
  const [viewCount] = useState(property.viewCount || 100);
  const [modalOpen, setModalOpen] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  const toggleFavorite = () => {
    setFavorites((prev) => !prev);
  };

  const openModal = async () => {
    setModalOpen(true);
    setLoadingDetails(true);

    try {
      const url = routesConfig.properties[propertyType]?.fetchById?.replace(":id", property.id);
      const response = await axios.get(url);

      const singularPropertyType = propertyType.slice(0, -1);
      const propertyData = response.data[singularPropertyType];
      setPropertyDetails(propertyData);
    } catch (error) {
      console.error("Failed to fetch property details:", error);
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
      {/* Thumbnail View */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "250px",
          overflow: "hidden",
          borderRadius: "10px",
          margin: "10px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          backgroundColor: property.media?.length ? "#f9f9f9" : "rgba(0,0,0,0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {property.media && property.media.length > 0 ? (
          <>
            {property.media.map((media, index) => (
              <Box
                key={index}
                component={media.endsWith(".mp4") ? "video" : "img"}
                src={media}
                autoPlay={media.endsWith(".mp4")}
                muted
                loop
                alt={`Property ${property.id}`}
                sx={{
                  display: index === currentMediaIndex ? "block" : "none",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "all 0.5s ease-in-out",
                }}
              />
            ))}

            <IconButton
              onClick={() => setCurrentMediaIndex((prev) => (prev - 1 + property.media.length) % property.media.length)}
              sx={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "white",
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>

            <IconButton
              onClick={() => setCurrentMediaIndex((prev) => (prev + 1) % property.media.length)}
              sx={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                color: "white",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        ) : (
          <Typography variant="h6" sx={{ color: "white" }}>
            No Media Available
          </Typography>
        )}

        {/* View Count */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
        >
          <Visibility />
          <Typography variant="caption" sx={{ marginLeft: "5px" }}>
            {viewCount}
          </Typography>
        </Box>

        {/* Share Icon */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "white",
          }}
        >
          <Share />
        </Box>

        {/* Thumbnail Icons */}
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
          <IconButton
            onClick={toggleFavorite}
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
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={openModal}
            sx={{
              fontSize: "10px",
              textTransform: "capitalize",
              backgroundColor: "rgba(0,0,0,0.7)",
              ":hover": { backgroundColor: "rgba(0,0,0,0.9)" },
            }}
          >
            Show Details
          </Button>
          <IconButton
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
          <IconButton
            onClick={handleLike}
            sx={{
              width: "35px",
              height: "35px",
              borderRadius: "5px",
              border: "1px solid white",
              color: "white",
            }}
          >
            <ThumbUp />
          </IconButton>
        </Box>
      </Box>

      {/* Modal */}
      <Modal open={modalOpen} onClose={closeModal}>
        <Paper
          sx={{
            width: "60%",
            margin: "auto",
            marginTop: "5%",
            padding: "20px",
            position: "relative",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <IconButton
            onClick={closeModal}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "red",
              color: "white",
              ":hover": { backgroundColor: "#cc0000" },
            }}
          >
            <Close />
          </IconButton>
          {loadingDetails ? (
            <Typography variant="h6">Loading details...</Typography>
          ) : propertyDetails ? (
            <>
              {/* Slim Table */}
              <Box sx={{ margin: "20px auto", width: "90%" }}>
                <Table>
                  <TableBody>
                    {Object.entries(propertyDetails)
                      .filter(([key]) => !["photos", "videos"].includes(key))
                      .map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
                            {key.replace(/([A-Z])/g, " $1")}
                          </TableCell>
                          <TableCell>{value?.toString() || "N/A"}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>

              {/* Divider and Contact Section */}
              <Box sx={{ textAlign: "center", margin: "20px 0" }}>
                <Divider>
                  <Typography variant="h6">Contact Us Now 👇</Typography>
                </Divider>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
                <IconButton sx={{ color: "red" }}>
                  <Phone />
                </IconButton>
                <IconButton sx={{ color: "green" }}>
                  <WhatsAppIcon />
                </IconButton>
                <IconButton sx={{ color: "blue" }}>
                  <FacebookIcon />
                </IconButton>
              </Box>
              <Divider sx={{ margin: "10px 0" }} />
              {/* Media Section */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Media
                </Typography>
                <Box sx={{ display: "flex", overflowX: "scroll", gap: "10px", whiteSpace: "nowrap" }}>
                  {propertyDetails.photos?.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index}`}
                      style={{
                        width: "150px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  ))}
                  {propertyDetails.videos?.map((video, index) => (
                    <video
                      key={index}
                      src={video}
                      controls
                      style={{
                        width: "150px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </>
          ) : (
            <Typography variant="h6" color="error">
              Failed to load details.
            </Typography>
          )}
        </Paper>
      </Modal>
    </>
  );
};

export default PropertyThumbnail;
