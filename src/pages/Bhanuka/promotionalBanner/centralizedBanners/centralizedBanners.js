import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './cenBanner.css';
import Layout from '../../DiscountPages/layout/Layout';
import {Link} from 'react-router-dom';

const CentralizedBanner = () => {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('/api/banner/banners'); // Adjust the API endpoint as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch banners');
        }
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setError('Could not load banners. Please try again later.');
      }
    };

    fetchBanners();
  }, []);

  // Function to handle delete
  const handleDelete = async (bannerId) => {
    try {
      const response = await fetch(`/api/banner/banners/${bannerId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete banner');
      }

      // Remove the deleted banner from the state
      setBanners(banners.filter((banner) => banner._id !== bannerId));
    } catch (error) {
      console.error('Error deleting banner:', error);
      setError('Could not delete banner. Please try again later.');
    }
  };

  // Function to handle update navigation
  const handleUpdate = (banner) => {
    navigate(`/update-banner/${banner._id}`, { state: { banner } }); // Navigate with state
  };

  return (
    <Layout>
      <div className="cenBan">
        <div className="bfcbdDiscount_heading">
          <h1>Welcome to ShopVista of Retail Rush - List of Banners</h1>
          <hr />
          <h4>You can update or delete banners here</h4>
          <div className="cssUEbtn">
          <button className="BactBtn"><Link to="/banner-form">Add a Promotional Banner</Link></button>
          <button className="BactBtn"><Link to="/Banuka/Home">Go to Homepage</Link></button>
          </div>
          
        </div>
        <div className="centralized-banner-container">
          {error && <div className="error-message">{error}</div>}
          <div className="banners-list">
            {banners.length > 0 ? (
              banners.map((banner) => (
                <div key={banner._id} className="banner-item">
                  <div className="banner-image">
                    <img src={banner.bannerImage} alt={`Banner for Item ${banner.itemId}`} />
                  </div>
                  <div className="banner-details">
                    <h3 className="item-id">Item Name: {banner.itemId}</h3>
                    <h4 className="store-id">Shop Name: {banner.storeId}</h4>
                    <div className="banner-actions">
                      <button onClick={() => handleUpdate(banner)} className="update-btn">
                        Update
                      </button>
                      <button onClick={() => handleDelete(banner._id)} className="delete-btn">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No banners found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CentralizedBanner;
