import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemGrid.css'; // CSS for item grid

const ItemGrid = ({ items }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/Banuka/singleproduct/${id}`);
  };

  return (
    <div className="grid-container">
      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={index} className="item-card">
            <div onClick={() => handleCardClick(item._id)} style={{ cursor: 'pointer' }}>
              <img src={item.img_url} alt={item.name} />
              <div className="">
                <h2>{item.name}</h2>
                <p style={{fontWeight:'800',textAlign:'left',paddingLeft:'10px',fontSize:'16px'}}>RS : {item.price}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};

export default ItemGrid;
