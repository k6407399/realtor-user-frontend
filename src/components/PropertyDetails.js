import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import axios from "../api/axios";
import routesConfig from "../config/routesConfig";

const PropertyDetails = () => {
  const { propertyType, propertyId } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const fetchUrl = routesConfig.properties[propertyType]?.fetchById?.replace(
          ":id",
          propertyId
        );

        if (!fetchUrl) {
          throw new Error("Invalid route configuration.");
        }

        const response = await axios.get(fetchUrl);
        setPropertyDetails(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Error fetching property details. Please try again.");
      }
    };

    fetchPropertyDetails();
  }, [propertyType, propertyId]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!propertyDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {propertyDetails.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {propertyDetails.description}
      </Typography>
      <Box>
        {propertyDetails.media?.map((media, index) => (
          <Box
            key={index}
            component={media.type === "video" ? "video" : "img"}
            src={media.url}
            autoPlay={media.type === "video"}
            muted
            loop
            controls={media.type === "video"}
            alt={propertyDetails.title}
            sx={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              marginBottom: "10px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PropertyDetails;
