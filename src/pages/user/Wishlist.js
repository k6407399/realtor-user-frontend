import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import PropertyThumbnail from "../../components/PropertyThumbnail";
import axios from "../../api/axios";
import routesConfig from "../../config/routesConfig";

const Wishlist = ({ isLoggedIn, openLoginModal }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    axios
      .get(routesConfig.wishlist.add)
      .then((response) => {
        setWishlist(response.data.properties || []);
      })
      .catch((error) => {
        console.error("Error fetching wishlist properties:", error);
      });
  }, [isLoggedIn, openLoginModal]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Wishlist
      </Typography>
      <Grid container spacing={2}>
        {wishlist.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <PropertyThumbnail
              property={property}
              propertyType="wishlist"
              isLoggedIn={isLoggedIn}
              openLoginModal={openLoginModal}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Wishlist;
