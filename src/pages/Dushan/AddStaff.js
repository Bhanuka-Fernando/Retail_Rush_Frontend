import React, { useState } from 'react';
import axios from 'axios';
import './AddStaff.css'; // Import the CSS file for styling

const AddStaff = () => {
  const [formData, setFormData] = useState({
    empId: '',
    name: '',
    position: '',
    contactNo: '',
    address: '',
    storeID: '' // Add storeID field
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit the form data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/staff/add', formData);
      setSuccess('Staff member added successfully!');
      setError('');
      setFormData({
        empId: '',
        name: '',
        position: '',
        contactNo: '',
        address: '',
        storeID: ''
      });
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div className="add-staff-container">
      <h2>Add New Staff Member</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Employee ID:</label>
          <input
            type="text"
            name="empId"
            value={formData.empId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact No:</label>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Store ID:</label>
          <input
            type="text"
            name="storeID"
            value={formData.storeID}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Staff</button>
      </form>
    </div>
  );
};

export default AddStaff;
