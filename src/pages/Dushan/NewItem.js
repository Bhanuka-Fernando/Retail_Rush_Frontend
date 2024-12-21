import React, { useState } from 'react';
import axios from 'axios';
import { storage } from './firebase';  // Import Firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const UploadItem = () => {
  const [formData, setFormData] = useState({
    storeId: '',    // Include storeId in the form data
    itemId: '',
    name: '',
    category: '',
    subcategory: '',
    description: '',
    price: '',      // New price field
    quantity: '',   // New quantity field
    img_url: '',
    tags: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFile) {
      // Upload image to Firebase
      const storageRef = ref(storage, `items/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress handler (optional)
        },
        (error) => {
          setError('Error uploading image');
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          submitItemData(downloadURL);
        }
      );
    } else {
      setError('Please select an image file');
    }
  };

  const submitItemData = async (imageUrl) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/items',  // Your backend route for item upload
        {
          storeId: formData.storeId,  // Send the manually entered storeId
          itemId: formData.itemId,
          name: formData.name,
          category: formData.category,
          subcategory: formData.subcategory,
          description: formData.description,
          price: parseFloat(formData.price),  // Convert price to a number
          quantity: parseInt(formData.quantity, 10),  // Convert quantity to a number
          img_url: imageUrl,  // Send the Firebase image URL
          tags: formData.tags.split(','),  // Convert comma-separated tags to an array
        },
        config
      );

      setSuccess(`Item ${data.name} has been uploaded successfully!`);
      setError('');
      setFormData({
        storeId: '',  // Clear the form fields after submission
        itemId: '',
        name: '',
        category: '',
        subcategory: '',
        description: '',
        price: '',   // Clear price field
        quantity: '',   // Clear quantity field
        img_url: '',
        tags: '',
      });
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div className="upload-item">
      <h2>Upload Item</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Store ID:</label>  {/* Input for storeId */}
          <input
            type="text"
            name="storeId"
            value={formData.storeId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Item ID:</label>
          <input
            type="text"
            name="itemId"
            value={formData.itemId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Subcategory:</label>
          <input
            type="text"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>  {/* New input for price */}
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>  {/* New input for quantity */}
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tags (comma separated):</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Item Image:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit">Upload Item</button>
      </form>
    </div>
  );
};

export default UploadItem;
