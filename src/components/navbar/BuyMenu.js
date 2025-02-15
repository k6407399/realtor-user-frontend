import React from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const BuyMenu = ({ anchorEl, setAnchorEl, handleBuyMenuFilter }) => {
  const handleMenuClick = (type) => {
    setAnchorEl(null); // Close the menu
    handleBuyMenuFilter(type); // Apply the selected filter
  };

  return (
    <Box
      onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
      onMouseLeave={() => setAnchorEl(null)}
    >
      <Button color="inherit" endIcon={<ArrowDropDownIcon />}>
        BUY
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleMenuClick("land")}>Land/Site</MenuItem>
        <MenuItem onClick={() => handleMenuClick("flats")}>Flats</MenuItem>
        <MenuItem onClick={() => handleMenuClick("villas")}>Villas</MenuItem>
        <MenuItem onClick={() => handleMenuClick("apartments")}>Apartments</MenuItem>
      </Menu>
    </Box>
  );
};

export default BuyMenu;
