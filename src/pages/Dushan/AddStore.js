import React, { useState } from 'react';
import axios from 'axios';

const StoreForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    storeId: '',
    description: '',
    location: { floorNumber: '', storeNumber:''},
    categories: [],
    contactInfo: { phone: '', email: '' },
    operatingHours: { open: '', close: '' },
    rating: 0,
    items: [],
    tags: [],
    logo_url: '',
    profileImage: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('contactInfo.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [key]: value },
      }));
    } else if (name.startsWith('operatingHours.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        operatingHours: { ...prev.operatingHours, [key]: value },
      }));
    } 
    else if (name.startsWith('location.')){
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        location: {...prev.location, [key]: value},
      }));
    }
    
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.post('/api/stores', formData);
      console.log('Store created:', response.data);
      // Reset form or redirect as necessary
    } catch (error) {
      console.error('Error creating store:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Store</h2>

      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      
      <div>
        <label>Store ID:</label>
        <input type="text" name="storeId" value={formData.storeId} onChange={handleChange} required />
      </div>

      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>

      <div>
        <label>Location:</label>
        <label>floorNumber</label>
        <input type="text" name="location.floorNumber" value={formData.floorNumber} onChange={handleChange} required />
        <label>storeNumber</label>
        <input type="text" name="location.storeNumber" value={formData.storeNumber} onChange={handleChange} required />
      </div>

      <div>
        <label>Categories (comma-separated):</label>
        <input type="text" name="categories" value={formData.categories.join(',')} onChange={(e) => setFormData({ ...formData, categories: e.target.value.split(',') })} required />
      </div>

      <div>
        <label>Contact Phone:</label>
        <input type="text" name="contactInfo.phone" value={formData.contactInfo.phone} onChange={handleChange} required />
      </div>

      <div>
        <label>Contact Email:</label>
        <input type="email" name="contactInfo.email" value={formData.contactInfo.email} onChange={handleChange} required />
      </div>

      <div>
        <label>Operating Hours (Open):</label>
        <input type="text" name="operatingHours.open" value={formData.operatingHours.open} onChange={handleChange} required />
      </div>

      <div>
        <label>Operating Hours (Close):</label>
        <input type="text" name="operatingHours.close" value={formData.operatingHours.close} onChange={handleChange} required />
      </div>

      <div>
        <label>Rating (0-5):</label>
        <input type="number" name="rating" min="0" max="5" value={formData.rating} onChange={handleChange} />
      </div>

      <div>
        <label>Logo URL:</label>
        <input type="text" name="logo_url" value={formData.logo_url} onChange={handleChange} />
      </div>

      <div>
        <label>Profile Image URL:</label>
        <input type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} />
      </div>

      <div>
        <label>Images (comma-separated URLs):</label>
        <input type="text" name="images" value={formData.images.join(',')} onChange={(e) => setFormData({ ...formData, images: e.target.value.split(',') })} />
      </div>

      <button type="submit">Create Store</button>
    </form>
  );
};

export default StoreForm;
