import React from "react";
import { Box, Typography } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to RealtorApp
      </Typography>
      <Typography variant="body1" paragraph>
        RealtorApp is the ultimate destination for buying, selling, and exploring
        properties like Land/Sites, Flats, Villas, and Apartment Buildings. Whether
        you're looking for your dream home, a lucrative investment opportunity, or
        just exploring options, we are here to make your property journey seamless and
        efficient.
      </Typography>
      <Typography variant="body1" paragraph>
        Our platform connects buyers and sellers directly, ensuring transparency and
        convenience. We offer a range of listings at competitive and affordable prices.
        With advanced filters, search capabilities, and a user-friendly interface, we
        make it easy for you to find exactly what you're looking for.
      </Typography>
      <Typography variant="body1" paragraph>
        Join the thousands of satisfied users who trust RealtorApp to meet their real
        estate needs. Your dream property is just a few clicks away!
      </Typography>
    </Box>
  );
};

export default About;
