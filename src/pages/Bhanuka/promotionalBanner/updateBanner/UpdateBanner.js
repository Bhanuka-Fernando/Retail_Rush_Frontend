import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './updBan.css'; // Reuse the same CSS for form styling
import Layout from '../../DiscountPages/layout/Layout';

const UpdateBannerForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the banner data from location state
  const { banner } = location.state || {};
  

  const [bannerImage, setBannerImage] = useState(banner?.bannerImage || '');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!banner) {
      // If no banner is passed, redirect back to the banner list
      navigate('/centralized-banners');
    }
  }, [banner, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);  // Create a URL for the selected file
      setBannerImage(fileURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
  
    const updatedBanner = {
      bannerImage
    };
  
    try {
      const response = await fetch(`/api/banner/banners/${banner._id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedBanner),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const json = await response.json();
        setError(json.error || 'An unknown error occurred.');
      } else {
        const json = await response.json();
        console.log('Banner updated successfully:', json);
        setError(null);
        navigate('/centralized-banners'); // Navigate back to the banner list after update
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      setError('An unexpected error occurred.');
    }
  };
  
  return (
    <Layout>
      <div className="bfbhbanner-heading">
        <h1>Update Banner Details</h1>
        <hr />
        <div className="banner-form-container">
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="banner-form-group">
              <div className="label-input-container">
                <label htmlFor="bannerImage" className="form-label">Banner Image</label>
                {/* Custom input container for file upload */}
                <div className="form-input-container">
                  <input
                    type="text"
                    id="bannerImage"
                    className="form-input"
                    value={bannerImage}
                    placeholder='No file selected'
                    readOnly
                  />
                  <label htmlFor="fileUpload" className="form-upload-btn">Select Banner</label>
                  <input
                    type="file"
                    id="fileUpload"
                    className="form-file-input"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="DFbtn dItemSaveBtn">
                Update Banner
              </button>
              <button type="button" className="DFbtn dItemCancelBtn" onClick={() => navigate('/centralized-banners')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateBannerForm;
