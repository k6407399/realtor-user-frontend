import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import axios from "../api/axios";
import routesConfig from "../config/routesConfig";
import PropertyThumbnail from "../components/PropertyThumbnail";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const responses = await Promise.allSettled([
          axios.get(routesConfig.properties.land.fetch),
          axios.get(routesConfig.properties.flats.fetch),
          axios.get(routesConfig.properties.villas.fetch),
          axios.get(routesConfig.properties.apartments.fetch),
        ]);

        console.log("API Responses:", responses);

        const backendStaticUrl = process.env.REACT_APP_BACKEND_URL.replace("/api/v1", "/static/");

        const combinedProperties = responses
          .filter((res) => res.status === "fulfilled")
          .flatMap((res, index) => {
            const type = ["land", "flats", "villas", "apartments"][index];
            return res.value?.data[type]?.map((item) => ({
              ...item,
              type,
              media: [
                ...(item.photos || []).map((photo) => `${backendStaticUrl}${photo}`),
                ...(item.videos || []).map((video) => `${backendStaticUrl}${video}`),
              ],
              title: item.id, // Use id as title fallback
            })) || [];
          });

        console.log("Combined Properties:", combinedProperties);

        if (combinedProperties.length === 0) {
          setError("No properties found.");
        } else {
          setProperties(combinedProperties);
          setError("");
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Error fetching properties. Please try again.");
      }
    };

    fetchProperties();
  }, []);

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Marquee for Live Updates */}
      <Box sx={{ marginBottom: "10px", backgroundColor: "#ffebc2", padding: "10px", borderRadius: "5px" }}>
        <marquee behavior="scroll" direction="left">
          🔥 Hot Selling Listings: 1200 sqft Land in Whitefield | 🏡 3BHK Villa in HSR Layout | 🌟 2BHK Flat in Koramangala |
          Check Now!
        </marquee>
      </Box>

      {/* Title with Filters */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Explore Properties
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "gray" }}>
          | Filter By: <span style={{ fontWeight: "bold" }}>Property Type | Location | Price</span>
        </Typography>
      </Box>

      {error && <Typography color="error.main">{error}</Typography>}

      {/* Thumbnails */}
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Grid container spacing={2}>
          {properties.map((property, index) => (
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
