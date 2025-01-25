import React from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SellMenu = ({ anchorEl, setAnchorEl }) => {
  return (
    <Box
      onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
      onMouseLeave={() => setAnchorEl(null)}
    >
      <Button color="inherit" endIcon={<ArrowDropDownIcon />}>
        SELL
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}>Land/Site</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Flats</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Villas</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Apartment Buildings</MenuItem>
      </Menu>
    </Box>
  );
};

export default SellMenu;
