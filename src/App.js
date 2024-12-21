
import React from 'react';

import {BrowserRouter, Routes, Route,Link,Router} from 'react-router-dom';

import { Toaster } from "react-hot-toast";

import { useSelector } from 'react-redux';


//Banuka
import Banuka_home from './pages/Banuka/Home';
import Banuka_login from './pages/Banuka/MainLogin';
import Banuka_single_product from './pages/Banuka/Single_product';
import Banuka_wishList from './pages/Banuka/WishList';
import Banuka_Filter_Page from './pages/Banuka/ItemFilterPage';
import Banuka_RegisterPage from './pages/Banuka/RegisterPage';

//Dushan

import AddStore from './pages/Dushan/AddStore';
import StoreProfile from './pages/Dushan/StoreProfile';
import SalesData from './pages/Dushan/SalesData';
import SalesCharts from './pages/Dushan/SalesCharts';
import AdminSupport from './pages/Dushan/AdminSupport';
import NewItem from './pages/Dushan/NewItem';
import StoreInventory from './pages/Dushan/StoreInventory';
import StoreItemView from './pages/Dushan/StoreItemView';
import AddStaff from './pages/Dushan/AddStaff';
import Staff from './pages/Dushan/Staff';


//Geshika
import SingleShopDetailsPage from "./pages/Geshika/SingleShopDetailsPage";
import Stores from "./pages/Geshika/Stores";
import StoreReviews from "./pages/Geshika/StoreReviews";

// bhanuka fernando
import DiscountForm from './pages/Bhanuka/DiscountPages/DiscountForm/DiscountForm';
import CentralizedBanner from './pages/Bhanuka/promotionalBanner/centralizedBanners/centralizedBanners';
import CentralizedDiscount from './pages/Bhanuka/DiscountPages/centralizedDiscountPage/CentralizedDiscount';
import UpdateDiscount from './pages/Bhanuka/DiscountPages/UpdateItem/updateDiscount';
import UpdateBannerForm from './pages/Bhanuka/promotionalBanner/updateBanner/UpdateBanner';
import BannerForm from './pages/Bhanuka/promotionalBanner/bannerForm/BannerForm';
import BannerDisplay from './pages/Bhanuka/promotionalBanner/bannerDisplay/Banner'
import DiscReport from './pages/Bhanuka/DiscountPages/activeDiscountsReport/DiscReport';





function App() {

  const{loading} = useSelector(state => state.alerts);
  const [date, setDate] = React.useState(new Date().getDate());



  return (
    <div>
      <BrowserRouter>
        {loading && (
          <div className="spinner-parent">
            <div class="spinner-border" role="status"></div>
          </div>
        )}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>


         {/*Banuka*/}
          <Route
          path='/Banuka/Home'
          element={<Banuka_home/>}/>

          <Route 
          path='/'
          element={<Banuka_login/>}/>

          <Route
          path='/Register'
          element={<Banuka_RegisterPage/>}/>

          <Route
          path='/Banuka/singleproduct/:id'
          element={<Banuka_single_product/>}/>

          <Route
          path='/Banuka/wishlist'
          element={<Banuka_wishList/>}/>

          <Route
          path='/Banuka/filter'
          element={<Banuka_Filter_Page/>}/>

          {/*Dushan*/}

          <Route path='/Dushan/AddStore'
          element={<AddStore/>}/>

          <Route path='/Dushan/StoreProfile'
          element={<StoreProfile/>}/>

          <Route path='/Dushan/SalesData'
          element={<SalesData/>}/>

          <Route path='/Dushan/SalesCharts'
          element={<SalesCharts/>}/>

          <Route path='/Dushan/AdminSupport'
          element={<AdminSupport/>}/>

          <Route path='/Dushan/NewItem'
          element={<NewItem/>}/>

          <Route path='/Dushan/Store'
          element={<StoreInventory/>}/>

          <Route path='/Dushan/Store2'
          element={<StoreItemView/>}/> 

          <Route path='/Dushan/AddStaff'
          element={<AddStaff/>}/> 


          {/*Geshika*/}

          <Route path="/geshika/stores" element={<Stores />} />
          <Route path='/reviews' element={<StoreReviews/>} />

          <Route
            path="/geshika/stores/:storeId"
            element={<SingleShopDetailsPage />}
          />

          {/*Bhanuka fernando*/}
          <Route path="/discount-form" element={<DiscountForm />} />
          <Route path="/centralized-banners" element={<CentralizedBanner />} />
          <Route path="/centralized-discount" element={<CentralizedDiscount />} />
          <Route path="/update-discount/:id" element={<UpdateDiscount />} />
          <Route path="/banner-form" element={<BannerForm />} />
          <Route path="/update-banner/:id" element={<UpdateBannerForm />} />
          <Route path="/banner-display" element={<BannerDisplay />} />
          <Route path="/discount-report" element={<DiscReport />} />

          {/* Sidebar Navigation*/} 

          <Route path="/support" element={<AdminSupport />} /> 
          <Route path="/sales" element={<SalesCharts />} /> 
          <Route path="/profile" element={<StoreProfile />} /> 
          <Route path="/products" element={<StoreInventory />} /> 
          <Route path="/team" element={<Staff />} />
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
