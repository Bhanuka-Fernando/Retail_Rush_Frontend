import React, { useEffect, useState } from 'react';
import './banner.css';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('/api/banner/banners'); // Adjust the API endpoint as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch banners');
        }
        const data = await response.json();
        console.log(data);
        setBanners(data);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setError('Could not load banners. Please try again later.');
      }
    };

    fetchBanners();
  }, []);

  // Auto-slide functionality (set interval to move to the next banner every 3 seconds)
  useEffect(() => {
    if (banners.length > 0) {
      const slideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 3000);

      return () => clearInterval(slideInterval); // Cleanup interval on component unmount
    }
  }, [banners.length]);

  // Navigate to the previous banner
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  // Navigate to the next banner
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="homepage-banner-section">
      {banners.length > 0 ? (
        <div className="banner-slider">
          {/* Left Arrow */}
          <button className="banner-nav left-arrow" onClick={handlePrev}>
            &#9664; {/* Unicode left arrow symbol */}
          </button>

          <div className="banner-slide" key={banners[currentIndex]?._id}>
            <a href={`/Banuka/singleproduct/66fe714273f8a45da8aadf05`}>
              <img 
                src={banners[currentIndex]?.bannerImage || 'fallback-image.jpg'} // Fallback image
                alt={`Banner for ${banners[currentIndex]?.itemId || 'an item'}`} // Provide better fallback for itemId
              />
            </a>
            {/* If `itemId` is undefined, show alternative text */}
            {!banners[currentIndex]?.itemId && <p></p>}
          </div>

          {/* Right Arrow */}
          <button className="banner-nav right-arrow" onClick={handleNext}>
            &#9654; {/* Unicode right arrow symbol */}
          </button>
        </div>
      ) : (
        <p>No banners available</p>
      )}
    </div>
  );
};

export default Banner;
