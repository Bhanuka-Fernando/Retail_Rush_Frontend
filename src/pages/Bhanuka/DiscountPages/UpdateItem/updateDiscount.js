import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './updateDiscount.css';
import Layout from '../layout/Layout';

const UpdateDiscount = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [discount, setDiscount] = useState({
    itemName: '',
    discountPercentage: '',
    startTime: '',
    endTime: '',
    startDate: '',
    endDate: ''
  });

  // Get current date in the format YYYY-MM-DD for setting min attribute in startDate
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await fetch(`/api/discount/discounts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch discount');
        }
        const json = await response.json();
        setDiscount({
          itemName: json.itemName,
          discountPercentage: json.discountPercentage,
          startDate: json.startDate.slice(0, 10),
          startTime: json.startTime,
          endDate: json.endDate.slice(0, 10),
          endTime: json.endTime
        });
      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching the discount details');
      }
    };

    fetchDiscount();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure discountPercentage is between 0 and 100
    if (name === 'discountPercentage' && (value < 0 || value > 100)) {
      return; // Do not allow values outside the range
    }

    setDiscount({ ...discount, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/discount/discounts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discount),
      });

      if (!response.ok) {
        throw new Error('Failed to update the discount');
      }

      const json = await response.json();
      console.log('Updated:', json);
      navigate('/centralized-discount');
    } catch (error) {
      console.error(error);
      alert('An error occurred while updating the discount');
    }
  };

  return (
    <Layout>
      <div className="BFupdate-discount-title">
        <h3>Update Discount details here</h3>
      </div>
      <div className="BFupdate-discount-container">
        <form className="BFupdate-discount-form" onSubmit={handleSubmit}>
          <div className="BFform-group">
            <label className="BFform-label">Item Name:</label><br />
            <input
              type="text"
              name="itemName"
              value={discount.itemName}
              className="BFform-input"
              disabled // Freeze the itemName field
            />
          </div>
          <div className="BFform-group">
            <label className="BFform-label">Discount Percentage:</label><br />
            <input
              type="number"
              name="discountPercentage"
              min="0"
              max="100"
              value={discount.discountPercentage}
              className="BFform-input"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="BFform-group">
            <label className="BFform-label">Start Date:</label><br />
            <input
              type="date"
              name="startDate"
              value={discount.startDate}
              className="BFform-input"
              onChange={handleInputChange}
              min={currentDate} // Restrict startDate to prevent past dates
              required
            />
          </div>
          <div className="BFform-group">
            <label className="BFform-label">Start Time:</label><br />
            <input
              type="time"
              name="startTime"
              value={discount.startTime}
              className="BFform-input"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="BFform-group">
            <label className="BFform-label">End Date:</label><br />
            <input
              type="date"
              name="endDate"
              value={discount.endDate}
              className="BFform-input"
              onChange={handleInputChange}
              min={discount.startDate} // Prevent selecting an endDate before startDate
              required
            />
          </div>
          <div className="BFform-group">
            <label className="BFform-label">End Time:</label><br />
            <input
              type="time"
              name="endTime"
              value={discount.endTime}
              className="BFform-input"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="BFupdate-form-actions">
            <button type="submit" className="BFupdateDFbtn BFupdateItemSaveBtn">Update Discount</button> <br />
            <button type="button" className="BFupdateDFbtn BFupdateItemCancelBtn" onClick={() => navigate('/centralized-discount')}>Cancel</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateDiscount;
