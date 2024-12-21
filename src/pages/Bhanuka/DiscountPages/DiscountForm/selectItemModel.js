import React, { useEffect, useState } from 'react';
import { fetchItemsByStore } from './apiService'; // Reuse the service
import './selectItemModel.css'; // Custom styles for the modal

const SelectItemModal = ({ isOpen, onClose, onSelectItem }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
  const storeId = localStorage.getItem('userEmail'); // You can dynamically fetch the storeId if needed

  useEffect(() => {
    const fetchItems = async () => {
      if (isOpen) { // Only fetch items when modal is open
        try {
          const data = await fetchItemsByStore(storeId);
          setItems(data);
          setFilteredItems(data); // Initially set filteredItems to all items
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchItems();
  }, [isOpen, storeId]);

  // Function to handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase(); // Case insensitive search
    setSearchTerm(value);
    // Filter items based on the search term
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setFilteredItems(filtered);
  };

  const handleItemSelect = (item) => {
    onSelectItem(item); // Pass selected item to the parent component
  };

  if (!isOpen) return null; // Don't render modal if not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select Item</h2>
       
        {/* Search input with icon */}
        <div className="search-container">
          <span className="search-icon">&#128269;</span> {/* Unicode search icon */}
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredItems.length > 0 ? (
          <ul>
            {filteredItems.map((item) => (
              <li key={item.itemId} onClick={() => handleItemSelect(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found</p>
        )}

        <button className="modelBtnDis" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SelectItemModal;
