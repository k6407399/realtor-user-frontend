import React, { useState } from "react";
import {
  Box,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, ZoomIn, Close } from "@mui/icons-material";

const MediaDisplay = ({ media, currentIndex, setCurrentIndex }) => {
  const [zoomModalOpen, setZoomModalOpen] = useState(false);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % media.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);

  return (
    <>
      {/* Main Media Display */}
      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
        {media?.map((item, index) => (
          <Box
            key={index}
            component={item.endsWith(".mp4") ? "video" : "img"}
            src={item}
            autoPlay={item.endsWith(".mp4")}
            muted
            loop
            controls={false} // Disable controls in the main display
            alt={`Media ${index}`}
            sx={{
              display: currentIndex === index ? "block" : "none",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "all 0.5s ease-in-out",
            }}
          />
        ))}

        {/* Navigation Buttons */}
        {media?.length > 1 && (
          <>
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "white",
              }}
            >
              <ArrowBackIos />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                color: "white",
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </>
        )}

        {/* Zoom Icon */}
        <IconButton
          onClick={() => setZoomModalOpen(true)}
          sx={{
            position: "absolute",
            top: "10px",
            right: "50px",
            color: "white",
          }}
        >
          <ZoomIn />
        </IconButton>
      </Box>

      {/* Zoom Modal */}
      <Modal
        open={zoomModalOpen}
        onClose={() => setZoomModalOpen(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper
          sx={{
            width: "80%",
            maxWidth: "800px",
            padding: "15px",
            position: "relative",
            backgroundColor: "black",
            borderRadius: "10px",
          }}
        >
          <IconButton
            onClick={() => setZoomModalOpen(false)}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "white",
              backgroundColor: "red",
              ":hover": { backgroundColor: "#d32f2f" },
            }}
          >
            <Close />
          </IconButton>

          {/* Media Controls */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <IconButton onClick={handlePrev} sx={{ color: "white" }}>
              <ArrowBackIos />
            </IconButton>

            {media?.map((item, index) => (
              <Box
                key={index}
                component={item.endsWith(".mp4") ? "video" : "img"}
                src={item}
                autoPlay={item.endsWith(".mp4")}
                controls={item.endsWith(".mp4")}
                alt={`Media ${index}`}
                sx={{
                  display: currentIndex === index ? "block" : "none",
                  width: "100%",
                  maxHeight: "500px",
                  objectFit: "contain",
                }}
              />
            ))}

            <IconButton onClick={handleNext} sx={{ color: "white" }}>
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default MediaDisplay;
