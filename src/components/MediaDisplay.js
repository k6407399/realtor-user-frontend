import React, { useState } from "react";
import {
  Box,
  IconButton,
  Modal,
  Paper,
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
            controls={false}
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
            width: "600px", // Fixed width
            height: "400px", // Fixed height
            padding: "15px",
            position: "relative",
            backgroundColor: "black",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={() => setZoomModalOpen(false)}
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
              backgroundColor: "#f44336",
              color: "white",
              fontSize: "0.7rem",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": { backgroundColor: "#d32f2f" },
            }}
          >
            <Close fontSize="small" />
          </IconButton>

          {/* Navigation Buttons */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: "10px",
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
              padding: "5px",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
            }}
          >
            <ArrowBackIos />
          </IconButton>

          {media?.map((item, index) => (
            <Box
              key={index}
              component={item.endsWith(".mp4") ? "video" : "img"}
              src={item}
              autoPlay={item.endsWith(".mp4")}
              controls={item.endsWith(".mp4")}
              controlsList="nodownload nofullscreen noremoteplayback"
              alt={`Media ${index}`}
              sx={{
                display: currentIndex === index ? "block" : "none",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          ))}

          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: "10px",
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
              padding: "5px",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Paper>
      </Modal>
    </>
  );
};

export default MediaDisplay;
