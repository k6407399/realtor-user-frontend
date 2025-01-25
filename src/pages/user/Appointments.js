import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import axios from '../../api/axios';
import routesConfig from '../../config/routesConfig';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(routesConfig.user.appointments.fetch, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      setAppointments(response.data.appointments || []);
      setError('');
    } catch (err) {
      console.error('Error fetching appointments:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to fetch appointments.');
    } finally {
      setLoading(false);
    }
  };  

  const cancelAppointment = async (id) => {
    try {
      await axios.put(
        routesConfig.user.appointments.update.replace(':id', id),
        { status: 'Cancelled' },
        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
      );
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: 'Cancelled' } : appt))
      );
      alert('Appointment canceled successfully.');
    } catch (err) {
      console.error('Error canceling appointment:', err);
      setError('Failed to cancel appointment.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography variant="h6">Loading Appointments...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        My Appointments
      </Typography>

      {error && (
        <Typography color="error" style={{ marginBottom: '10px' }}>
          {error}
        </Typography>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Property ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt.id}>
                <TableCell>{appt.propertyId}</TableCell>
                <TableCell>{new Date(appt.date).toLocaleString()}</TableCell>
                <TableCell>{appt.status}</TableCell>
                <TableCell>
                  {appt.status !== 'Cancelled' && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => cancelAppointment(appt.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserAppointments;
