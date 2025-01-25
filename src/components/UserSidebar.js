import React from "react";
import { Box, List, ListItem, ListItemText, Typography, Button, Divider, Snackbar, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const UserSidebar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [notification, setNotification] = React.useState({
    open: false,
    message: "",
    type: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setNotification({ open: true, message: "Logout successful", type: "success" });
    navigate("/");
  };

  return (
    <>
      <Box
        width="250px"
        bgcolor="grey.200"
        display="flex"
        flexDirection="column"
        height="90vh"
        position="sticky"
        top={0}
      >
        <Box p={2} borderBottom="1px solid #ccc">
          <Typography variant="h6" align="center" color="primary">
            User Dashboard
          </Typography>
        </Box>

        <Box flexGrow={1} overflow="auto">
          <List>
            <ListItem button component={Link} to="/dashboard/profile">
              <ListItemText primary="Profile" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/dashboard/my-listings">
              <ListItemText primary="My Listings" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/dashboard/appointments">
              <ListItemText primary="Appointments" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/dashboard/liked-properties">
              <ListItemText primary="Liked Properties" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/dashboard/wishlist">
              <ListItemText primary="Wishlist" />
            </ListItem>
            <Divider />
          </List>
        </Box>

        <Box p={2} borderTop="1px solid #ccc">
          <Button variant="contained" color="error" fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.type}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserSidebar;
