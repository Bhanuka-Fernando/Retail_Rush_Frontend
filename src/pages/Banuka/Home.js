import React, { useEffect, useState } from 'react';
import './Home.css';
import Card from '../../components/Banuka/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Spin } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import BannerCarousel from '../../components/Banuka/BannerCarousel';
import CategoriesSection from '../../components/Banuka/CategoriesSection';
import FlashSaleSection from '../../components/Banuka/FlashSaleSection';
import ProductGrid from '../../components/Banuka/ProductGrid';
import Sidebar from '../../components/Banuka/SideBar';
import FeaturedStores from '../../components/Banuka/FeaturedStores';
import LogoutButton from '../../components/Banuka/Logout';
import HeaderComponent from '../../components/Banuka/HeaderComponent';
import Banner from '../Bhanuka/promotionalBanner/bannerDisplay/Banner';

export default function Home() {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecoms();
    getAllItems();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 2) {
      setLoading(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  const getRecoms = async () => {
    try {
      const res = await axios.get("/api/rec/recommendations", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      console.log("dlfsdkjfd")
      console.log(res.data)
      setCardData(res.data);
    } catch (err) {
      console.error("Error fetching recommendations", err);
    }
  };

  const getAllItems = async () => {
    if (!hasMore) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("/api/items/getAllitems", {
        params: { page, limit: 12 }
      });
      setItemList(prevItemList => [...prevItemList, ...res.data.data]);
      setLoading(false);

      if (page >= res.data.totalpages) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching items", err);
    }
  };

  const getImageForItem = (itemName) => {
    try {
      return require(`../../Images/Banuka/${itemName}`);
    } catch (error) {
      //console.error(`Image not found for ${itemName}`);
      return require('../../Images/Banuka/TV.jpg');
    }
  };

  const handleCardClick = (itemId) => {
    console.log("-----------------")
    console.log(itemId);
    navigate(`/Banuka/singleproduct/${itemId}`);
  };

  const handleAddToWishlist = async (itemId) => {
    await axios.post("/api/rec/clicked", 
      { item_id: itemId }, 
      { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    alert('Item added to wishlist!');
    try {
      await axios.post("http://localhost:8070/api/wishlist/add", 
        { item_id: itemId }, 
        { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    } catch (err) {
      console.error("Error adding to wishlist", err);
    }
  };

  return (
    <div>
    <HeaderComponent/>
    <div className="home-page">
      
      
      
      {/* Banner Section */}
      <Banner />

    
      
      {/* Category Highlight Section */}
      <CategoriesSection />
      
      
      {/* Flash Sale Section */}
      <FeaturedStores/>
      
      
    
      {/* Main Content (Sidebar + Products) */}
    
  
      <div style={{textAlign:'left', backgroundColor:'white',padding:'10px 20px',margin:'10px'}}>
        
        <div style={{display:'flex'}}>
          <div style={{flex:'1'}}>
            <h2 style={{ textAlign: 'left' }}>Just For You</h2>
          </div>
            <div style={{display:'flex',alignItems:'center'}}><Button onClick={() => navigate('/Banuka/filter')} style={{borderColor:"orange",color:'orange'}} >Shop All Products</Button> </div>
          </div>

      

      <div className="home-container">
        
        <ProductGrid 
          products={cardData}
          handleCardClick={handleCardClick}
          handleAddToWishlist={handleAddToWishlist}
          getImageForItem={getImageForItem}
        />
      </div>
      </div>

      {/* All Items Section 
      <section className="all-items">
        <h2>All Items</h2>
        <div className="cards-container-wrap">
          {itemList.map((card, index) => {
            const imgr = card.img_url;
            console.log("test",card._id)
            return (
              <div style={{ width: '18vw', marginBottom: '40px',marginRight:'10px' }} key={index}>
                <Card title={card.name} image={imgr} description={card.description} id={card._id} />
                
              </div>
            );
          })}
        </div>
        {loading && <div className="loading-spinner"><Spin size="large" /></div>}
      </section>
      */}
    </div>
    </div>
  );
}
