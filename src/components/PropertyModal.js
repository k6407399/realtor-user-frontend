import React from "react";
import {
  Modal,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const PropertyModal = ({ modalOpen, closeModal, loadingDetails, propertyDetails }) => {
  const fieldsToDisplay = [
    { key: "propertyId", label: "Property ID" },
    { key: "propertyType", label: "Property Type" },
    { key: "area", label: "Area (sqft)" },
    { key: "pricePerSqft", label: "Price Per Sqft (₹)" },
    { key: "totalPrice", label: "Total Price (₹)" },
    { key: "location", label: "Location" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "country", label: "Country" },
  ];

  return (
    <Modal open={modalOpen} onClose={closeModal}>
      <Paper
        sx={{
          width: "40%",
          margin: "auto",
          marginTop: "5%",
          padding: "15px",
          position: "relative",
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <IconButton
          onClick={closeModal}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "#f44336",
            color: "white",
            fontSize: "0.9rem",
            width: "30px",
            height: "30px",
            ":hover": { backgroundColor: "#d32f2f" },
          }}
        >
          <Close fontSize="small" />
        </IconButton>

        {loadingDetails ? (
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Loading details...
          </Typography>
        ) : propertyDetails ? (
          <>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "20px",
                textTransform: "capitalize",
              }}
            >
              Property Details
            </Typography>
            <Divider sx={{ marginBottom: "15px" }} />

            <Table>
              <TableBody>
                {fieldsToDisplay.map(({ key, label }) => (
                  <TableRow key={key}>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#555",
                        textTransform: "capitalize",
                        width: "40%",
                      }}
                    >
                      {label}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px", color: "#333" }}>
                      {propertyDetails[key] ? propertyDetails[key].toString() : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <Typography variant="h6" color="error" sx={{ textAlign: "center" }}>
            Failed to load property details.
          </Typography>
        )}
      </Paper>
    </Modal>
  );
};

export default PropertyModal;
