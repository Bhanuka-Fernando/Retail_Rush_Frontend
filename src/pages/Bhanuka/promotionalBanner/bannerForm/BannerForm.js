import { useNavigate } from 'react-router-dom';
import './bannerForm.css';
import { useState } from 'react';
import Layout from '../../DiscountPages/layout/Layout';
import { storage } from '../../../Dushan/firebase'; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary Firebase functions

const BannerForm = () => {
  const [bannerImage, setBannerImage] = useState('');
  const [file, setFile] = useState(null); // State to hold the selected file
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile); // Create a URL for the selected file
      setBannerImage(fileURL);
      setFile(selectedFile); // Store the file for upload
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select an image to upload');
      return;
    }

    try {
      const storageRef = ref(storage, `banners/${file.name}`); // Create a reference for the image
      await uploadBytes(storageRef, file); // Upload the image

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      const bannerData = {
        bannerImage: downloadURL,
      };

      const response = await fetch('/api/banner', {
        method: 'POST',
        body: JSON.stringify(bannerData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      } else {
        // Reset form
        setBannerImage('');
        setFile(null); // Reset the file state
        setError(null);
        console.log('Banner successfully created/updated', json);
        navigate('/centralized-banners'); // Navigate to centralized banner page
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An unexpected error occurred.');
    }
  };

  const handleCancel = () => {
    navigate('/centralized-discount'); // Navigate back to centralized discount page
  };

  return (
    <Layout>
      <div className="bfbanner-heading">
        <h1>Welcome to ShopNAME of Retail Rush</h1>
        <hr />
        <h4>Manage Your Banners Here</h4>
        <div className="bfbabanner-form-container">
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <div className="banner-form-group">
              <label htmlFor="bannerImage" className="bfbaform-label">Banner Image</label><br />
              
              {/* Custom input container for file upload */}
              <div className="bfbaform-input-container">
                <input
                  type="text"
                  id="bannerImage"
                  className="bfbaform-input"
                  value={bannerImage}
                  placeholder='No file selected'
                  readOnly
                />
                <label htmlFor="fileUpload" className="bfbaform-upload-btn">Select Banner</label>
                <input
                  type="file"
                  id="fileUpload"
                  className="bfbaform-file-input"
                  onChange={handleFileChange}
                  accept="image/*"
                  required // Make file upload required
                />
              </div>
            </div>

            <div className="bfbaform-actions">
              <button type="submit" className="bfbabanner-btn bfbabanner-save-btn">Save</button><br />
              <button type="button" className="bfbabanner-btn bfbabanner-cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default BannerForm;
