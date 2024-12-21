import React, { useState } from 'react';
import { TextField, Button, MenuItem, CircularProgress, Snackbar, Alert, Box, Typography, Paper } from '@mui/material';
import './AdminSupport.css';
import Layout from './Layout';

const issueTypes = [
  { value: 'Error', label: 'Error' },
  { value: 'Complaint', label: 'Complaint' },
  { value: 'Other', label: 'Other' }
];

const AdminSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: 'Error',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setOpen(true);
      setFormData({ name: '', email: '', issueType: 'Error', message: '' });
    }, 2000);
  };

  const handleClose = () => setOpen(false);

  return (
    <Layout>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
      <Paper elevation={3} sx={{ padding: '30px', width: '100%', maxWidth: '600px', backgroundColor: 'white' }}>
        <Typography variant="h4" align="center" gutterBottom>Admin Support</Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Report any issues, and we'll resolve them as quickly as possible.
        </Typography>
        
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            fullWidth
            margin="normal"
            required
          />

          <TextField
            select
            label="Issue Type"
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {issueTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            required
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
            {loading ? <CircularProgress /> : (
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            )}
          </Box>
        </form>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={success ? "success" : "error"} sx={{ width: '100%' }}>
            {success ? 'Your issue has been successfully submitted!' : 'Submission failed. Please try again.'}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
    </Layout> 
  );
};

export default AdminSupport;
