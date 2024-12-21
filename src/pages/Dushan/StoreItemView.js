import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import './StoreItemView.css';

const StoreInventoryCardView = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    itemId: '',
    name: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const storeId = 'st003'; // Replace with dynamic storeId if necessary

  // Fetch all items in the store
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get(`/api/items/store/${storeId}`);
        setItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchItems();
  }, [storeId]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter items based on search query
  const filteredItems = items.filter(
    item =>
      item.name.toLowerCase().includes(searchQuery) ||
      item.itemId.toLowerCase().includes(searchQuery)
  );

  // Delete an item
  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`/api/items/${itemId}`);
      setItems(items.filter(item => item.itemId !== itemId)); // Update the UI
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Edit an item (populate the form with item data)
  const editItem = (item) => {
    setEditingItem(item.itemId);
    setFormData({
      itemId: item.itemId,
      name: item.name,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit the updated item data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/items/${editingItem}`, formData);
      setItems(items.map(item => (item.itemId === editingItem ? formData : item)));
      setEditingItem(null); // Close the edit form after submission
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <Layout>
      <div className="store-inventory-card-view">
        <h2>Items in Store</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or ID"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button onClick={() => {/* Add view items logic */}}>Search</button>
        </div>
        <div className="items-container">
          {filteredItems.length === 0 ? (
            <p>No items found in your store</p>
          ) : (
            filteredItems.map(item => (
              <div key={item.itemId} className="item-card">
                {item.img_url && <img src={item.img_url} alt={item.name} className="item-image" />}
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Price: LKR {item.price}</p> {/* Change to LKR */}
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="item-actions">
                  <button onClick={() => editItem(item)}>Modify</button>
                  <button onClick={() => deleteItem(item.itemId)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Edit Form */}
        {editingItem && (
          <div className="edit-item-form">
            <h3>Edit Item</h3>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Item ID:</label>
                <input
                  type="text"
                  name="itemId"
                  value={formData.itemId}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Category:</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditingItem(null)}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StoreInventoryCardView;
