import React from "react";
import { Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ViewCount = ({ count }) => (
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
    <VisibilityIcon />
    <Typography variant="caption" sx={{ marginLeft: "5px" }}>
      {count}
    </Typography>
  </Box>
);

export default ViewCount;
