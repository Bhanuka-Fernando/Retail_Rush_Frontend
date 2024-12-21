import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box, Avatar, Typography, Grid, Card, CardContent, CircularProgress, Alert,
    TextField, Button
} from '@mui/material';
import Layout from './Layout';

const StoreProfile = () => {
    const [store, setStore] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedStore, setUpdatedStore] = useState({});

    const storeId = localStorage.getItem('userEmail'); // Hardcoded for now, but can be dynamic

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const { data } = await axios.get(`/api/stores/${storeId}`);
                console.log(data);
                setStore(data);
                setUpdatedStore(data); // Initialize updatedStore with fetched data
                setLoading(false);
            } catch (error) {
                setError('Store not found');
                setLoading(false);
            }
        };

        fetchStore();
    }, [storeId]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedStore((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            // Make a PUT request to update the store details, excluding the storeId
            await axios.put(`/api/stores/${storeId}`, updatedStore);
            setStore(updatedStore); // Update the state with the new store data
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            setError('Failed to update store');
        }
    };

    if (loading) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <CircularProgress />
                </Box>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box sx={{ padding: '30px' }}>
                <Card elevation={3} sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
                    <Grid container spacing={3}>
                        {/* Profile Image Section */}
                        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar
                                src={store.profileImage}
                                alt={`${store.name}'s Profile`}
                                sx={{ width: 200, height: 200, borderRadius: '50%', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
                            />
                        </Grid>

                        {/* Store Information Section */}
                        <Grid item xs={12} sm={8}>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>{store.name}'s Profile</Typography>

                                {isEditing ? (
                                    <>
                                        <TextField
                                            label="Store Name"
                                            name="name"
                                            value={updatedStore.name}
                                            onChange={handleInputChange}
                                            fullWidth
                                            sx={{ marginBottom: '10px' }}
                                        />
                                        <TextField
                                            label="Email"
                                            name="email"
                                            value={updatedStore.email}
                                            onChange={handleInputChange}
                                            fullWidth
                                            sx={{ marginBottom: '10px' }}
                                        />
                                        <TextField
                                            label="Description"
                                            name="description"
                                            value={updatedStore.description}
                                            onChange={handleInputChange}
                                            fullWidth
                                            sx={{ marginBottom: '10px' }}
                                            multiline
                                            rows={4}
                                        />
                                        <TextField
                                            label="Store ID"
                                            name="storeId"
                                            value={updatedStore.storeId}
                                            disabled
                                            fullWidth
                                            sx={{ marginBottom: '10px' }}
                                        />
                                        <TextField
                                            label="Location (Floor Number)"
                                            name="location.floorNumber"
                                            value={updatedStore?.location?.floorNumber || ''}
                                            onChange={handleInputChange}
                                            fullWidth
                                            sx={{ marginBottom: '10px' }}
                                        />
                                        <TextField
                                            label="Location (Store Number)"
                                            name="location.storeNumber"
                                            value={updatedStore?.location?.storeNumber || ''}
                                            onChange={handleInputChange}
                                            fullWidth
                                            sx={{ marginBottom: '10px' }}
                                        />
                                        <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginRight: '10px' }}>
                                            Save
                                        </Button>
                                        <Button variant="outlined" onClick={handleEditToggle}>
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="body1" color="textSecondary">
                                            <strong>Email:</strong> {store.email}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary" sx={{ marginTop: '10px' }}>
                                            <strong>Description:</strong> {store.description}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary" sx={{ marginTop: '10px' }}>
                                            <strong>Store ID:</strong> {store.storeId}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary" sx={{ marginTop: '10px' }}>
                                            <strong>Location:</strong> Floor {store?.location?.floorNumber}, Store {store?.location?.storeNumber}
                                        </Typography>
                                        <Button variant="outlined" onClick={handleEditToggle} sx={{ marginTop: '20px' }}>
                                            Edit Profile
                                        </Button>
                                    </>
                                )}
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        </Layout>
    );
};

export default StoreProfile;
