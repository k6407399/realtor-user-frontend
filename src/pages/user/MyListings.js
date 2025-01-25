import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import PropertyThumbnail from "../../components/PropertyThumbnail";
import axios from "../../api/axios";
import routesConfig from "../../config/routesConfig";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${routesConfig.properties.land.fetch}?userId=${localStorage.getItem("userId")}`)
      .then((response) => {
        const data = response.data.lands || [];
        if (!data.length) {
          setError("You have not listed any properties yet.");
        }
        setListings(data);
      })
      .catch(() => {
        setError("Error fetching your listings. Please try again later.");
      });
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Listings
      </Typography>
      {error ? (
        <Box textAlign="center">
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
          <Button variant="contained" color="primary" href="/dashboard/list-now">
            List Now
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {listings.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <PropertyThumbnail property={property} propertyType="listing" />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyListings;
