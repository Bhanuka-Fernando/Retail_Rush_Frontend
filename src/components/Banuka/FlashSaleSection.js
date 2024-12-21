import React from 'react';
import { Statistic } from 'antd';
import './FlashSaleSection.css';

const { Countdown } = Statistic;

const flashSaleItems = [
  { name: '4K Ultra HD TV', img: 'TV.jpg', discount: '20%', price: '$500' },
  { name: 'Smartphone', img: 'Smartphone.jpg', discount: '15%', price: '$300' },
  // Add more items
];

const FlashSaleSection = () => (
  <div className="flash-sale-section">
    <h2>Flash Sales</h2>
    <Countdown title="Ends in" value={Date.now() + 1000 * 60 * 60 * 24} />
    <div className="flash-sale-items">
      {flashSaleItems.map((item, index) => (
        <div key={index} className="flash-sale-item">
          <img
            src={require(`../../Images/Banuka/${item.img}`)}
            alt={item.name}
          />
          <h3>{item.name}</h3>
          <p>Discount: {item.discount}</p>
          <p>Price: {item.price}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FlashSaleSection;
