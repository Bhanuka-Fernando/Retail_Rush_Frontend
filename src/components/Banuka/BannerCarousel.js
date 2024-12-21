import React from 'react';
import { Carousel } from 'antd';
import './BannerCarousel.css';  

const banners = ['banner1.jpg', 'banner2.jpg', 'banner3.jpg'];

const BannerCarousel = () => (
  <div style={{margin:'0 10px'}}>
  <Carousel autoplay>
    {banners.map((banner, index) => (
      <div key={index}>
        <img
          src={require(`../../Images/Banuka/${banner}`)}
          alt={`banner-${index}`}
          style={{ width: '100%', height: 400 }}
        />
      </div>
    ))}
  </Carousel>
  </div>
);

export default BannerCarousel;
