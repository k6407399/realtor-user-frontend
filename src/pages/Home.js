import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "../api/axios";
import routesConfig from "../config/routesConfig";
import PropertyThumbnail from "../components/PropertyThumbnail";

const Home = ({ handleBuyMenuFilter }) => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    propertyType: "",
    location: "",
    priceRange: "",
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const responses = await Promise.allSettled([
          axios.get(routesConfig.properties.land.fetch),
          axios.get(routesConfig.properties.flats.fetch),
          axios.get(routesConfig.properties.villas.fetch),
          axios.get(routesConfig.properties.apartments.fetch),
        ]);

        const backendStaticUrl = process.env.REACT_APP_BACKEND_URL.replace(
          "/api/v1",
          "/static/"
        );

        const combinedProperties = responses
          .filter((res) => res.status === "fulfilled")
          .flatMap((res, index) => {
            const type = ["land", "flats", "villas", "apartments"][index];
            return (
              res.value?.data?.[type === "land" ? "lands" : type]?.map((item) => ({
                ...item,
                type,
                media: [
                  ...(item.photos || []).map(
                    (photo) => `${backendStaticUrl}${photo}`
                  ),
                  ...(item.videos || []).map(
                    (video) => `${backendStaticUrl}${video}`
                  ),
                ],
                title: `${item.propertyType} @ ${item.location}`,
              })) || []
            );
          });

        setProperties(combinedProperties);
        setFilteredProperties(combinedProperties);
        setError(combinedProperties.length === 0 ? "No properties found." : "");
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Error fetching properties. Please try again.");
      }
    };

    fetchProperties();
  }, []);

  const applyFilters = (properties, filters) => {
    const { propertyType, location, priceRange } = filters;

    return properties.filter((property) => {
      const matchesType =
        !propertyType || property.type.toLowerCase() === propertyType.toLowerCase();
      const matchesLocation =
        !location ||
        property.location.toLowerCase().includes(location.toLowerCase());
      const matchesPrice =
        !priceRange ||
        (priceRange === "<500000" && property.totalPrice < 500000) ||
        (priceRange === "500001-1000000" &&
          property.totalPrice >= 500001 &&
          property.totalPrice <= 1000000) ||
        (priceRange === "1000001-5000000" &&
          property.totalPrice >= 1000001 &&
          property.totalPrice <= 5000000) ||
        (priceRange === ">5000000" && property.totalPrice > 5000000);

      return matchesType && matchesLocation && matchesPrice;
    });
  };

  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    const filtered = applyFilters(properties, updatedFilters);
    setFilteredProperties(filtered);
    setError(filtered.length === 0 ? "No properties match your filters." : "");
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Marquee for Live Updates */}
      <Box
        sx={{
          marginBottom: "10px",
          backgroundColor: "#ffebc2",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <marquee behavior="scroll" direction="left">
          🔥 Hot Selling Listings: 1200 sqft Land in Whitefield | 🏡 3BHK Villa
          in HSR Layout | 🌟 2BHK Flat in Koramangala | Check Now!
        </marquee>
      </Box>

      {/* Title with Filters */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Explore Properties
        </Typography>
        <Box
          sx={{ display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap" }}
        >
          {/* Property Type Dropdown */}
          <Select
            value={filters.propertyType}
            onChange={(e) => handleFilterChange("propertyType", e.target.value)}
            displayEmpty
            sx={{ width: 200 }}
          >
            <MenuItem value="">All Property Types</MenuItem>
            <MenuItem value="land">Land/Site</MenuItem>
            <MenuItem value="flats">Flats</MenuItem>
            <MenuItem value="villas">Villas</MenuItem>
            <MenuItem value="apartments">Apartments</MenuItem>
          </Select>

          {/* Location Search Field */}
          <TextField
            placeholder="Search Location"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 200 }}
          />

          {/* Price Range Dropdown */}
          <Select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
            displayEmpty
            sx={{ width: 200 }}
          >
            <MenuItem value="">All Prices</MenuItem>
            <MenuItem value="<500000">
              <CurrencyRupeeIcon fontSize="small" /> Less than 5 Lacs
            </MenuItem>
            <MenuItem value="500001-1000000">
              <CurrencyRupeeIcon fontSize="small" /> 5 Lacs - 10 Lacs
            </MenuItem>
            <MenuItem value="1000001-5000000">
              <CurrencyRupeeIcon fontSize="small" /> 10 Lacs - 50 Lacs
            </MenuItem>
            <MenuItem value=">5000000">
              <CurrencyRupeeIcon fontSize="small" /> Above 50 Lacs
            </MenuItem>
          </Select>
        </Box>
      </Box>

      {error && <Typography color="error.main">{error}</Typography>}

      {/* Thumbnails */}
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Grid container spacing={2}>
          {filteredProperties.map((property, index) => (
            <Grid item xs={12} sm={6} md={4} key={property.id || index}>
              <PropertyThumbnail property={property} propertyType={property.type} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
