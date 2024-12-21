import React, { useEffect, useState } from 'react';
import { HeartOutlined, ShoppingCartOutlined, ShopOutlined } from '@ant-design/icons';
import { Carousel, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './SingleProduct.css'; // Import the CSS file for styling
import ProductGrid from '../../components/Banuka/ProductGrid';
import ItemGrid from '../../components/Banuka/ItemGrid';
import HeaderComponent from '../../components/Banuka/HeaderComponent';


export default function SingleProduct() {

    const navigate = useNavigate();
    const [itemData, setItemData] = useState({});
    const [storesData, setStoresData] = useState([]);
    const [currentStore, setCurrentStore] = useState([]);
    const { id } = useParams();
    const [discountP, setDiscountP] = useState(0);
    const [similerItems,setSimilerItems] = useState([]);

    useEffect(() => {
        const fetchData = async () =>{
            await getItem();
            await getSimilerItems();

            
        
        };

        fetchData();
        
         
    }, [id]);


    const getSimilerItems = async () => {
        

        try{
            const res = await axios.get(`/api/rec/simileritems/${id}`)

            console.log("tagggggggggggggggggggggggggg",res);
            setSimilerItems(res.data);
            console.log("simiiiiiiiiiiii",res)
            
        }
        catch(err){
            console.log(err);
        }
    }
    const getItem = async () => {
        try {
            const res = await axios.get(`/api/items/getItemById/${id}`);
            console.log("res", res);
            setItemData(res.data.data.item);
            console.log("itemdata",itemData)
            setDiscountP(res.data.data.discount);
            const stores = await axios.get(`/api/items/getstoresby_Id/${id}`);
            console.log("storesssssss",stores);
            setStoresData(stores.data.data.otherStores);
            setCurrentStore(stores.data.data.currentStore);


           

            
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddToWishlist = async () => {
        await axios.post("/api/rec/clicked", 
            { item_id: id }, 
            { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
          );
        alert('Item added to wishlist!');
        try {
            await axios.post(
                "http://localhost:8070/api/wishlist/add",
                { item_id: id },
                { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
        } catch (err) {
            console.log(err);
        }
    };

    const getImageForItem = (itemName) => {
        try {
            return require(`../../Images/Banuka/${itemName}`);
        } catch (error) {
            console.error(`Image not found for ${itemName}`);
            return require('../../Images/Banuka/TV.jpg'); // Fallback image
        }
    };

    //const imgr = getImageForItem(itemData.img_url || 'default-image.jpg');

    const imgr = itemData.img_url;

    // Calculate the discounted price
    const discountedPrice = (itemData.price - (itemData.price * discountP) / 100).toFixed(2);

    return (

        <div>
    <HeaderComponent/>
        <div className="single-product-page">
            <div className="product-container">
                {/* Image Section */}
                <div className="product-images">
                    <Carousel autoplay dots={false}>
                        <div>
                            <img
                                src={imgr}
                                alt={itemData.name}
                                className="product-image"
                            />
                        </div>
                    </Carousel>
                </div>

                {/* Product Information */}
                <div className="product-info">
                    <h1 className="product-name">{itemData.name || 'Product Name'}</h1>
                    <h1 className="product-store" style={{cursor:'pointer'}} onClick={()=>navigate(`/geshika/stores/${currentStore[0].storeId}`)}> {currentStore[0]?.name || 'Store'}</h1>
                    

                    {/* Price Display*/}
                    <div className="price-section">
                    <p className="discounted-price">LKR {discountedPrice}  </p>
                        {discountP > 0 && (
                            <p className="actual-price" style={{display:'flex', gap:'10px',margin:'0px',alignItems:'center'}}>
                                <span className="strikethrough">${itemData.price}</span>
                                <span style={{fontSize:'20px', color:'#d3031c'}}>{discountP}% off</span>
                            </p>
                        )}
                        
                    </div>
                    <div style={{color:'gray',fontWeight:'400', marginTop:'8px',fontSize:'14px'}}>
                        <text>Inclusive of all taxes<br/>
                        (Also includes all applicable duties)</text>
                    </div>
                    <div className="product-details2" style={{marginTop:'20px'}}>
                    <text style={{fontWeight:'600',textAlign:'center',fontSize:'26px'}}>Description</text>
                    <h4 >
                        
                        {itemData.description || 'Store'}
                        </h4>
                    </div>

                    <p className="product-tags">{itemData.tags ? itemData.tags.join(', ') : 'No tags available'}</p>
                    <h3 style={{ textAlign: 'center', marginTop: '40px' }}>{"Available Stores"}</h3>
                    

                    <div className="store-list" >
                        {storesData.map((store, index) => (
                            
                            <div key={index} className="store-item" onClick={()=>navigate(`/geshika/stores/${store.storeId}`)}>
                                <ShopOutlined style={{ fontSize: '20px' }} />
                                <div style={{ marginBottom:'10px',gap:'5px',alignItems:'center'}}>
                                
                                <span style={{paddingTop:'0px',fontWeight:'600',fontSize:'15px',color:'rgb(176, 116, 5)'}}>{store.name || 'Store Name'}</span>
                                </div>
                                

                                {console.log("sdsdsds",store)}
                                
                                {!store.discount && (
                                    <div>LKR {store.storeItem.price}</div>
                                )}
                                
                                {store.discount >0 &&(
                                    <div>
                                <p className="actual-price" style={{display:'flex', gap:'2px',margin:'0px',alignItems:'center'}}>
                                <span className="strikethrough">${store.storeItem.price}</span>
                                <span style={{fontSize:'15px', color:'#d3031c'}}>{store.discount}% off</span>
                                </p>
                                </div>
                                )}
                                
                                
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="product-actions">
                        <button
                            type="default"
                            icon={<HeartOutlined />}
                            size="large"
                            className="action-button"
                            onClick={handleAddToWishlist}
                        >
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Details Section */}
            <div style={{backgroundColor:'#fff',paddingTop:'20px'}}>
            <text style={{paddingLeft:'20px',fontSize:'20px',fontWeight:'600',color:'black'}}>Similer Items</text>
           <ItemGrid
            items={similerItems}
           />
           </div>
            
        </div>
        </div>
    );
}
