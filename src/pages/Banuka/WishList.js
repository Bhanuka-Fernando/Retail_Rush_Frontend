import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderComponent from '../../components/Banuka/HeaderComponent';

import './WishList.css';
import { Button } from 'antd';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch wishlist items when the component mounts
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('/api/wishlist/get', {
          headers: {
            // Include auth token if required
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log("wwww",response.data.data);
        if (response.data.success) {
          console.log("sucesss")
          setWishlist(response.data.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
    console.log("wiiiii",wishlist);
  }, []);

  const removeFromWishlist = async (itemId) => {
    try {
      const response = await axios.delete(`/api/wishlist/delete/${itemId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        // Remove item from local state
        setWishlist({
          ...wishlist,
          items: wishlist.items.filter((item) => item._id !== itemId),
        });
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };


  const getImageForItem = (itemName) => {

    
    try {
      return require(`../../Images/Banuka/${itemName}`); // Dynamically require image based on item name
    } catch (error) {
      console.error(`Image not found for ${itemName}`);
      return require('../../Images/Banuka/TV.jpg'); // Fallback to a default image if not found
    }
  };



  if (loading) {
    return <div>Loading your wishlist...</div>;
  }

  if (!wishlist || wishlist.items.length === 0) {
    return <div>Your wishlist is empty.</div>;
  }

  
  return (

    <div>
    <HeaderComponent/>
    <div className="wishlist-page">
        <h2 className="wishlist-title">My Wishlist</h2>
        {wishlist.length === 0 ? (
            <p className="wishlist-empty">Your wishlist is empty.</p>
        ) : (
            <div className="wishlist-scroll-container">
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    {wishlist.items.map(item => (
                        <div className='Main-card'>
                          <div className='upper'>
                            <div style={{flexGrow : 1}}>
                              <h3>{item.name}</h3>
                            </div>
                            <div >
                              <h3 style={{color:'orange'}}>{item.store.name}</h3>
                              
                             
                            </div>
                          </div>
                          <div className='lower' style={{position:'relative'}}>
                              
                                  <div className='lower-image'>
                                  <img src={item.img_url} alt={item.name} className="wishlist-image" />
                                  </div>
                                  <div className='lower-details'>
                                    <h4>{item.description}</h4>
                                    <p>{item.tags.join(', ')}</p>
                                    <p>Items Left: {item.quantity}</p>
                                  </div>

                                  <div className='lower-price'>
                                      <h4>LKR:{item.price}</h4>

                                      <div className='lower-actions'>
                                        <Button className="remove-btn" onClick={()=>removeFromWishlist(item._id)}>Remove</Button>
                                      </div>
                                  </div>

                                 <div style={{height:'100%',color:'#f8f8f8',backgroundColor:'#f8f8f8',width:'5px',position:'absolute',right:175}}>
                                      <h5>|</h5>
                                 </div>

                                  

                                 <div style={{ display: 'flex', flexDirection: 'column', width: '200px', alignItems: 'flex-end', paddingRight: '10px' }}>
                                    <div style={{ flex: '1', paddingRight: '18px' }}>
                                      <div style={{ marginBottom: '5px' }}>
                                        <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Business Hours</span>
                                      </div>
                                      <div>
                                        <span style={{ fontSize: '14px', color: '#666' }}>{item.store.operatingHours.open}{' '}AM - {item.store.operatingHours.close}{' '}PM</span>
                                      </div>
                                    </div>
                                    <div style={{ flex: '1', marginTop: '20px',paddingRight:'12px' }}>
                                      <div style={{ marginBottom: '5px' }}>
                                        <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#333',paddingRight:'50px' }}>Location</span>
                                      </div>
                                      <div>
                                        <span style={{ fontSize: '14px', color: '#666' }}>{item.store.location.floorNumber}th floor, {item.store.location.storeNumber}th store</span>
                                      </div>
                                    </div>
                                  </div>


                            {/*<div style={{marginBottom:'10px'}}>Location</div>
                                    <div style={{marginBottom:'5px'}}><text>Floor Number :{item.store.location.floorNumber}''</text></div>
                                    <div style={{flex:1}}><text>Store Number :{item.store.location.storeNumber}</text></div>*/}
                                  
                                  
                              
                          </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
    </div>
);
};

export default Wishlist;
