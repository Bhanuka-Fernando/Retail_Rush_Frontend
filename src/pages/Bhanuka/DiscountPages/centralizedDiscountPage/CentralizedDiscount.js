import DiscountDetails from "./discountDetails";
import './discountDetails.css'; // Import CSS file
import { useEffect, useState } from "react";
import Layout from '../layout/Layout'; // Import Layout component
import {Link} from "react-router-dom";

const CentralizedDiscount = () => {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchDiscountList = async () => {
      try {
        const response = await fetch('/api/discount/activeDiscounts/');
        const json = await response.json();

        if (response.ok) {
          const currentDateTime = new Date();
          const expiredDiscountIds = [];
          
          const activeDiscounts = json.filter(discount => {
            const [year, month, day] = discount.endDate.split('T')[0].split('-');
            const [hour, minute] = discount.endTime ? discount.endTime.split(':') : ['0', '0 AM'];

            const endDateTime = new Date(year, month - 1, day, hour, minute); // Ensure this is set correctly

            if (endDateTime <= currentDateTime) {
              expiredDiscountIds.push(discount._id);
              return false;
            }
            return true;
          });

          setDiscounts(activeDiscounts);

          if (expiredDiscountIds.length > 0) {
            await deleteExpiredDiscounts(expiredDiscountIds);
          }
        } else {
          console.error('Failed to fetch discounts:', json.error);
        }
      } catch (error) {
        console.error('An error occurred while fetching discounts:', error);
      }
    };

    const deleteExpiredDiscounts = async (ids) => {
      try {
        const response = await fetch('/api/discount/deleteExpired', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids }),
        });

        if (response.ok) {
          const json = await response.json();
          console.log(json.message); // Success message
        } else {
          const json = await response.json();
          console.error('Failed to delete expired discounts:', json.error);
        }
      } catch (error) {
        console.error('Error occurred while deleting expired discounts:', error);
      }
    };

    fetchDiscountList();
  }, []);

  return (
    <Layout> {/* Wrap with Layout component */}
      <div className="class">
        <div className="bfcdDiscount_heading">
          <h1>Welcome to ShopVista of Retail Rush - Discounted Items</h1>
          <hr />
          <h4>Manage your discounts here </h4>
            <div className="cenBtnDR">
              <button className="actBtn"><Link to="/discount-report">Discounts Report</Link></button>
              <button className="actBtn"><Link to="/discount-form">Add Discount</Link></button>
              <button className="actBtn"><Link to="/centralized-banners">Promotional Banners</Link></button>
            </div>
        </div>
        <div className="discount-container-unique">
          {discounts.length > 0 ? (
            discounts.map((discount) => (
              <DiscountDetails key={discount._id} discount={discount} />
            ))
          ) : (
            <p>No active discounts available.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CentralizedDiscount;
