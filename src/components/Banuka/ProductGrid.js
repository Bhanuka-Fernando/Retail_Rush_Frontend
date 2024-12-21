import React from 'react';
import { Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import Card from '../Banuka/Card'; // import your card component here
import './ProductGrid.css';

const ProductGrid = ({ products, handleCardClick, handleAddToWishlist, getImageForItem }) => (
  
    console.log("productsdfdfdfdf",products),
  
    <div className="product-grid">
        
    <div className="product-grid-container">
      {products.map((card, index) => {
        //const imgr = getImageForItem(card.item.img_url);
        console.log("card",card.img_url)
        const imgr = card.item.img_url;
        return (
          <div  key={index}>
            <Card
              key={index}
              title={card.item.name}
              image={imgr}
              id={card.item._id}
              //description={card.item.tags.join(', ')}
              description={card.item.price}
            />
            {/*}<div className="product-actions">
              <Button
                type="primary"
                onClick={() => handleCardClick(card.item._id)}
              >
                View Details
              </Button>
              <Button
                type="default"
                icon={<HeartOutlined />}
                onClick={() => handleAddToWishlist(card.item._id)}
              >
                Add to Wishlist
              </Button>
            </div>
            {*/}
          </div>
        );
      })}
    </div>
    </div>
  
 
);



export default ProductGrid;
