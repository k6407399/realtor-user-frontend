import React from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 1,
        padding: "5px 10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        border: "1px solid #ccc",
        maxWidth: "100%",
      }}
    >
      <InputBase
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          flex: 1,
          fontSize: "14px",
          padding: "0 10px",
        }}
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton
        onClick={handleSearchSubmit}
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          "&:hover": {
            backgroundColor: "#115293",
          },
        }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
