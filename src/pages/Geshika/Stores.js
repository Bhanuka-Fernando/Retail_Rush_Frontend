import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { fetchStores } from "../../redux/registeredStoresSlice";
import './storeGeshika.css'
import HeaderComponent from "../../components/Banuka/HeaderComponent";

const Stores = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get navigate function from useNavigate
  const { stores, status, error } = useSelector((state) => state.stores);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStores());
    }
  }, [status, dispatch]);

  // Handle loading, error, and rendering states
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return(
    <>

    <HeaderComponent/>

  <div className="store-cards-container">
  {stores.map((store) => (
    <div key={store._id} className="store-card">
      <img
        className="store-card-image"
        src={store.profileImage}
        alt={store.name}
      />
      <h2 className="store-card-title">{store.name}</h2>
      <p className="store-card-description">{store.description}</p>
      <button className="store-card-button" onClick={() => navigate(`/geshika/stores/${store.storeId}`)}>
        Go to shop
      </button>
    </div>
  ))}
</div>
</>
  )
};

export default Stores;
