import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeaturedStores.css';
import { useNavigate } from 'react-router-dom';

const FeaturedStores = () => {
  const [featuredStores, setFeaturedStores] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from backend
    const fetchFeaturedStores = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/stores/');
        setFeaturedStores(response.data); // Assuming the backend returns an array of featured stores
      } catch (err) {
        console.error("Failed to fetch featured stores", err);
      }
    };

    fetchFeaturedStores();
  }, []); // Fetch data once when the component mounts

  useEffect(() => {
    // Change store every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredStores.length);
    }, 3000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [featuredStores]);

  if (featuredStores.length === 0) {
    return <div>Loading...</div>; // Loading state while data is being fetched
  }

  const { storeId,name, profileImage, rating, description, location, contactInfo,operatingHours } = featuredStores[currentIndex];
  console.log('logooo',profileImage)

  return (
    <div className="featured-stores-section">
      <h2 style={{ textAlign: 'left' }}>Featured Store</h2>

      <div onClick={() => navigate(`/geshika/stores/${storeId}`)} className="featured-store-card">
        <div style={{ flex: '1' }}>
          <img
            src={profileImage}  // Assuming backend provides the correct image URL
            alt={name}
            className="store-logo"
          />
        </div>
      
        <div style={{ flex: '0.4' }}>
          <h3 style={{color:'orange'}}>{name}</h3>
          <p style={{fontSize:'24px',fontWeight:'600',color:'black',marginTop:'20px'}}>{description}</p>
          <div style={{ textAlign: 'left',marginTop:'30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Floor Number</p>
                <p style={{ fontSize: '16px' }}>{location.floorNumber}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Store Number</p>
                <p style={{ fontSize: '16px' }}>{location.storeNumber}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Open</p>
                <p style={{ fontSize: '16px' }}>{operatingHours.open} AM</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Close</p>
                <p style={{ fontSize: '16px' }}>{operatingHours.close} PM</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Phone</p>
                <p style={{ fontSize: '16px' }}>{contactInfo.phone}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Email</p>
                <p style={{ fontSize: '16px' }}>{contactInfo.email}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Rating</p>
                <p style={{ fontSize: '16px' }}>{rating} / 5</p>
              </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default FeaturedStores;
