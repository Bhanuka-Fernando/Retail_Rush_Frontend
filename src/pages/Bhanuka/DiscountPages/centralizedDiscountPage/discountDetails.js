import React from 'react';
import { useNavigate } from 'react-router-dom';
import './discountDetails.css';

const DiscountDetails = ({ discount }) => {
    const navigate = useNavigate();

    const formatTime = (timeString) => {
        if (!timeString) {
            console.error('Invalid timeString:', timeString);
            return 'N/A'; // Return a default value if timeString is invalid
        }
        
        const [hour, minute] = timeString.split(':');
        const [timePart] = minute.split(' '); // Ensure 'AM'/'PM' part is handled
        const hours24 = timePart === 'PM' && parseInt(hour) !== 12 ? parseInt(hour) + 12 : parseInt(hour);
        const date = new Date();
        date.setHours(hours24, parseInt(minute));
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };
    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('/api/discount/discounts/' + discount._id, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete the discount');
            }

            const json = await response.json();
            console.log(json.message);
            window.location.reload();

        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the discount');
        }
    };

    const handleUpdate = () => {
        navigate(`/update-discount/${discount._id}`);
    };

    return (
        <div className="discount-item-container-unique">
            <div className="discount-image-unique">
                <img src={discount.itemImage} alt={discount.itemName} />
            </div>
            <div className="discount-details-unique">
                <h1 className="item-name">{discount.itemName}</h1>
                <br />
                <p className="discount-percentage"><strong>{discount.discountPercentage}% OFF</strong></p>
                <p><strong>Starts:</strong> {formatDate(discount.startDate)} <strong>at </strong>{formatTime(discount.startTime)}</p>
                <p><strong>Ends:</strong> {formatDate(discount.endDate)} <strong>at </strong>{formatTime(discount.endTime)}</p>
                <div className="discount-actions-unique">
                    <span className="delete-btn-unique" onClick={handleDelete}>Delete</span>
                    <span className="update-btn-unique" onClick={handleUpdate}>Update</span>
                </div>
            </div>
        </div>
    );
};

export default DiscountDetails;
