import React from 'react';
import './CategoriesSection.css';  // create a separate CSS file for styling
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';


const categories = [
  { name: 'Electronics', img: 'Electronics.jpg' },
  { name: 'Fashion', img: 'Fashion.jpg' },
  { name: 'Home_Appliances', img: 'HomeAppliances.jpg' },
  { name: 'Books', img: 'Books.jpg' },
  { name: 'SportsOutdoors', img: 'Sports&OutDoor.jpg' }
  // Add more categories as needed
];

const CategoriesSection = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    console.log("Selected category:", category);
    navigate(`/Banuka/Filter?category=${category}`); // Navigate to the filter page
  };

  return (
    <div className="categories-section">
      <div style={{display:'flex'}}>
        <div style={{flex:'1'}}>
      <h2 style={{ textAlign: 'left' }}>Categories</h2>
      </div>
      <div style={{display:'flex',alignItems:'center'}}><Button onClick={() => navigate('/Banuka/filter')} style={{borderColor:"orange",color:'orange'}}>Shop All Products</Button> </div>
      </div>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="category-card" 
            onClick={() => handleClick(category.name)} // Use arrow function to prevent immediate invocation
          >
            <img
              src={require(`../../Images/Banuka/${category.img}`)}
              alt={category.name}
            />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
