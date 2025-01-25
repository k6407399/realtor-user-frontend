import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "../../api/axios";
import routesConfig from "../../config/routesConfig";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(routesConfig.user.profile.fetch, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
        setFormData({ name: response.data.name || "" });
        setError("");
      } catch (error) {
        console.error("Error fetching profile:", error.response || error.message);
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        routesConfig.user.profile.update,
        { name: formData.name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setProfile(response.data.user);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error.response || error.message);
      setError("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {profile ? (
        <Box>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!isEditing}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mobile Number"
            value={profile.mobileNumber}
            disabled
            fullWidth
            margin="normal"
          />

          {isEditing ? (
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Box>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)} sx={{ mt: 2 }}>
              Edit Profile
            </Button>
          )}
        </Box>
      ) : (
        <Typography>No profile data available.</Typography>
      )}

      {successMessage && (
        <Snackbar
          open={true}
          autoHideDuration={4000}
          onClose={() => setSuccessMessage("")}
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position at top center
        >
          <Alert severity="success">{successMessage}</Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Profile;
