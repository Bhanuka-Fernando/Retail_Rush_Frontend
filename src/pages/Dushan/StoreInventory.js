import React, { useState, useEffect, axios } from 'react';
import { fetchItemsByStore } from '../Bhanuka/DiscountPages/DiscountForm/apiService'; // Import the service
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import './StoreInventory.css';

const StoreInventory = () => {
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
  const [searchTerm, setSearchTerm] = useState('');

  const storeId = localStorage.getItem('userEmail'); // Replace with dynamic storeId if necessary
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fetchItemsByStore(storeId);
        setItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchItems();
  }, [storeId]);

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`/api/items/${itemId}`);
      setItems(items.filter(item => item.itemId !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/items/${editingItem}`, formData);
      setItems(items.map(item => (item.itemId === editingItem ? formData : item)));
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemId.toString().includes(searchTerm)
  );

  const handleViewItems = () => {
    navigate('/Dushan/Store2');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <Layout>
      <div className="store-inventory">
        <h2>Items in Store</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Name or Item ID"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="view-items-button" onClick={handleViewItems}>View Items</button>
        </div>

        {filteredItems.length === 0 ? (
          <p className="no-items">No items found in your store</p>
        ) : (
          <>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.itemId}>
                    <td>{item.itemId}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>LKR {item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button className="edit-button" onClick={() => editItem(item)}>Edit</button>
                      <button className="delete-button" onClick={() => deleteItem(item.itemId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
                  <button className="submit-button" type="submit">Save Changes</button>
                  <button className="cancel-button" type="button" onClick={() => setEditingItem(null)}>
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default StoreInventory;
