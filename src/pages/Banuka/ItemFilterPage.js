import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Slider, Checkbox, Button, Input } from 'antd';
import axios from 'axios';
import './ItemFilterPage.css'; // CSS for the page
import ItemGrid from '../../components/Banuka/ItemGrid';
import HeaderComponent from '../../components/Banuka/HeaderComponent';


const categoriesWithSubcategories = {
    Electronics: ["Smartphones", "Laptops", "Cameras", "Headphones", "Smartwatches"],
    Fashion: ["Footwear", "Clothing", "Accessories", "Watches", "Sunglasses"],
    Home_Appliances: ["Refrigerators", "Washing Machines", "Microwave Ovens", "Air Conditioners", "Vacuum Cleaners"],
    Books: ["Fiction", "Non-fiction", "Children's Books", "Academic", "Biographies"],
    SportsOutdoors: ["Fitness Equipment", "Sportswear", "Outdoor Gear", "Camping Equipment", "Cycling Accessories"]
};

const ItemFilterPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  const navigate = useNavigate();
  
  // Ensure category is initialized as an array or an empty array
  const [filters, setFilters] = useState({
    category: category ? [category] : [], 
    subCategory: [],
    priceRange: [0, 1000000],
    tags: "",
    searchQuery: "" // New state to hold search query
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [filters]);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:8070/api/items/getFilteredItems', {
        params: {
          category: filters.category,
          subcategory: filters.subCategory,
          minPrice: filters.priceRange[0],
          maxPrice: filters.priceRange[1],
          tags: filters.tags,
          searchQuery: filters.searchQuery // Pass the search query to the backend
        }
      });
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategoryChange = (checkedValues) => {
    setFilters((prev) => ({ ...prev, category: checkedValues, subCategory: [] }));
  };

  const handleSubCategoryChange = (category, checkedValues) => {
    setFilters((prev) => {
      const newSubCategories = prev.subCategory.filter(
        (sub) => !categoriesWithSubcategories[category].includes(sub)
      );
      return { ...prev, subCategory: [...newSubCategories, ...checkedValues] };
    });
  };

  const handlePriceChange = (value) => {
    setFilters((prev) => ({ ...prev, priceRange: value }));
  };

  const handleTagSearch = (tag) => {
    if (tag) {
      setFilters((prev) => ({ ...prev, tags: tag }));
    }
  };

  const handleSearchQueryChange = (e) => {
    const searchQuery = e.target.value;
    setFilters((prev) => ({ ...prev, searchQuery }));
  };

  const handleAddToWishlist = async (itemId) => {
    try {
      await axios.post("/api/rec/clicked", { item_id: itemId }, 
        { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } });
      alert('Item added to wishlist!');
      await axios.post("http://localhost:8070/api/wishlist/add", 
        { item_id: itemId }, 
        { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } });
    } catch (err) {
      console.error("Error adding to wishlist", err);
    }
  };

  const handleCardClick = (itemId) => {
    navigate(`/Banuka/singleproduct/${itemId}`);
  };

  return (
    <div>
    <HeaderComponent/>
    <div className="item-filter-page">
      <aside className="filter-sidebar">
        <h2>Filters</h2>

        {/* Category Filter */}
        <div className="filter-section">
          <h3>Categories</h3>
          <Checkbox.Group onChange={handleCategoryChange}>
            {Object.keys(categoriesWithSubcategories).map((category, index) => (
              <div key={index} className="category-group">
                <Checkbox value={category}>{category}</Checkbox>

                {/* Subcategory Filter */}
                {filters.category?.includes(category) && (
                  <div className="subcategory-group">
                    <h4>Subcategories</h4>
                    <Checkbox.Group
                      onChange={(checkedValues) => handleSubCategoryChange(category, checkedValues)}
                    >
                      {categoriesWithSubcategories[category].map((subCategory, subIndex) => (
                        <Checkbox key={subIndex} value={subCategory}>
                          {subCategory}
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </div>
                )}
              </div>
            ))}
          </Checkbox.Group>
        </div>

        {/* Price Filter */}
        <div className="filter-section">
          <h3>Price Range</h3>
          <Slider
            range
            defaultValue={[0, 1000000]}
            max={1000000}
            onChange={handlePriceChange}
          />
        </div>

        {/* Search Filter */}
        <div className="filter-section">
          <h3>Search Items</h3>
          <Input.Search
            placeholder="Search items by name"
            onChange={handleSearchQueryChange}
            value={filters.searchQuery}
            
            enterButton={<Button disabled style={{color:'gray',fontWeight:'600'}}>Search</Button>}
          />
        </div>
      </aside>

      {/* Items Grid */}
      <main className="item-grid">
        <ItemGrid items={items} onCardClick={handleCardClick} />
      </main>
    </div>
    </div>
  );
};

export default ItemFilterPage;
