import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import PropertyThumbnail from "../../components/PropertyThumbnail";
import axios from "../../api/axios";
import routesConfig from "../../config/routesConfig";

const LikedProperties = () => {
  const [likedProperties, setLikedProperties] = useState([]);

  useEffect(() => {
    axios
      .get(routesConfig.likes.add)
      .then((response) => {
        setLikedProperties(response.data.properties || []);
      })
      .catch((error) => {
        console.error("Error fetching liked properties:", error);
      });
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Liked Properties
      </Typography>
      <Grid container spacing={2}>
        {likedProperties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <PropertyThumbnail property={property} propertyType="liked" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LikedProperties;
