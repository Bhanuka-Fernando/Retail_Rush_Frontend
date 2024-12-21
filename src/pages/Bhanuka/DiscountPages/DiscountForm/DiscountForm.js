import { useNavigate } from 'react-router-dom';
import './DiscountForm.css';
import { useState } from 'react';
import Layout from '../layout/Layout';
import SelectItemModal from './selectItemModel'; // Import the modal

const DiscountForm = () => {
  const [itemId, setItemId] = useState(''); // Track itemId
  const storeId = localStorage.getItem('userEmail');
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState(''); // Track item image
  const [discountPercentage, setDiscountPercentage] = useState(''); // Default is empty, not zero
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [originalPrice, setOriginalPrice] = useState(0); // Assuming original price comes from your item

  const [startTime, setStartTime] = useState({ hour: '', minute: '', amPm: 'AM' });
  const [endTime, setEndTime] = useState({ hour: '', minute: '', amPm: 'AM' });
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const navigate = useNavigate();

  const handleSelectItem = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleItemSelect = (item) => {
    setItemName(item.name); // Set the selected item name in the input
    setItemId(item.itemId); // Set the itemId if needed for submission
    setItemImage(item.img_url); // Set the image URL from the selected item
    setOriginalPrice(item.price);
    setDiscountedPrice(item.price);
    setIsModalOpen(false); // Close modal after item is selected
  };

  const formatTime = (time) => {
    const hour = (time.amPm === 'PM' && time.hour !== '12' ? parseInt(time.hour) + 12 : time.hour).toString();
    const paddedHour = hour.padStart(2, '0');
    const paddedMinute = time.minute.toString().padStart(2, '0');
    return `${paddedHour}:${paddedMinute}`;
  };

  // Get today's date to restrict past dates
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !startTime.hour || !startTime.minute || !endTime.hour || !endTime.minute) {
      setError("Please fill in all fields.");
      return;
    }

    const startDateTime = new Date(`${startDate}T${formatTime(startTime)}`);
    const endDateTime = new Date(`${endDate}T${formatTime(endTime)}`);

    if (startDateTime >= endDateTime) {
      setError("End date and time must be later than start date and time.");
      return;
    }

    const discount = {
      itemId,
      storeId,
      itemName,
      discountPercentage,
      itemImage,
      discountedPrice,
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
    };

    try {
      const response = await fetch('/api/discount/', {
        method: 'POST',
        body: JSON.stringify(discount),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      } else {
        // Reset form
        setItemName('');
        setItemImage(''); // Clear image after submission
        setDiscountPercentage('');
        setDiscountedPrice('');
        setStartDate('');
        setEndDate('');
        setItemImage('');
        setStartTime({ hour: '', minute: '', amPm: 'AM' });
        setEndTime({ hour: '', minute: '', amPm: 'AM' });
        setError(null);
        console.log('New Discount item added', json);
        navigate('/centralized-discount');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An unexpected error occurred.');
    }
};

  const handleTimeChange = (setter) => (field, value) => {
    setter((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  // Update discounted price based on the discount percentage
  const handleDiscountChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 100) {
      setDiscountPercentage(value);
      const newDiscountedPrice = originalPrice - (originalPrice * value) / 100;
      setDiscountedPrice(newDiscountedPrice < 0 ? 0 : newDiscountedPrice); // Ensure the discounted price doesn't go below 0
    }
  };

  return (
    <Layout>
      <div className="bfdfDiscount_heading">
        <h3>Manage Your Discounts Here</h3>
        <div className="bfdfdiscountForm-container">
          <form onSubmit={handleSubmit}>
            {error && <div className="bfdferror-message">{error}</div>}

            <div className="bfdfdiscountInputs">
              <div className="bfdfdivisionOne">
                <label htmlFor="item" className="bfdfform-label">Select Item</label><br />
                <div className="bfdfselect-item-group">
                  <input
                    type="text"
                    id="item"
                    className="bfdfform-input bfdfselect-item-input"
                    value={itemName} // Display selected item name here
                    placeholder="Select Item"
                    readOnly // Set to readOnly since item selection is via the modal
                  />
                  <button type="button" className="bfdfselect-item-button" onClick={handleSelectItem}>Select Item</button>
                </div>

                <label htmlFor="discount-percentage" className="bfdfform-label">Discount Percentage (%)</label><br />
                <input
                  id="discount-percentage"
                  type="number"
                  className="bfdfform-input"
                  onChange={handleDiscountChange} // Update discounted price on change
                  value={discountPercentage}
                  placeholder="Enter Percentage"
                  min="1"
                  max="100"
                />

                <label htmlFor="discounted-price" className="bfdfform-label">Discounted Price</label><br />
                <input
                  id="discounted-price"
                  type="number"
                  className="bfdfform-input"
                  value={discountedPrice.toFixed(2)} // Show discounted price
                  placeholder="Discounted Price"
                  readOnly // Set to readOnly since it's auto-calculated
                />
              </div>
              
              <div className="bfdfdivisionTwo">
                {itemImage ? (
                  <img
                    src={itemImage} // Display the selected item's image
                    alt={itemName || 'Selected Item'}
                    className="bfdfitem-image"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/150" // Placeholder image when no item is selected
                    alt="Placeholder"
                    className="bfdfitem-image"
                  />
                )}
              </div>
            </div>

            <div className="bfdfinline-fields">
              <div className="bfdfinline-group">
                <label htmlFor="start-date" className="bfdfform-label">Start Date</label>
                <input
                  id="start-date"
                  type="date"
                  className="bfdfform-input"
                  onChange={(e) => setStartDate(e.target.value)}
                  value={startDate}
                  min={today} // Disallow past dates
                />
                <label htmlFor="start-time" className="bfdfform-label">Start Time</label>
                <div className="bfdftime-input-group">
                  <select value={startTime.hour} onChange={(e) => handleTimeChange(setStartTime)('hour', e.target.value)}>
                    {Array.from({ length: 12 }, (_, i) => (i + 1).toString()).map(hour => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                  </select>
                  <span>:</span>
                  <select value={startTime.minute} onChange={(e) => handleTimeChange(setStartTime)('minute', e.target.value)}>
                    {Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : i.toString())).map(minute => (
                      <option key={minute} value={minute}>{minute}</option>
                    ))}
                  </select>
                  <select value={startTime.amPm} onChange={(e) => handleTimeChange(setStartTime)('amPm', e.target.value)}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              <div className="bfdfinline-group">
                <label htmlFor="end-date" className="bfdfform-label">End Date</label>
                <input
                  id="end-date"
                  type="date"
                  className="bfdfform-input"
                  onChange={(e) => setEndDate(e.target.value)}
                  value={endDate}
                  min={startDate} // Disallow end dates before the start date
                />
                <label htmlFor="end-time" className="bfdfform-label">End Time</label>
                <div className="bfdftime-input-group">
                  <select value={endTime.hour} onChange={(e) => handleTimeChange(setEndTime)('hour', e.target.value)}>
                    {Array.from({ length: 12 }, (_, i) => (i + 1).toString()).map(hour => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                  </select>
                  <span>:</span>
                  <select value={endTime.minute} onChange={(e) => handleTimeChange(setEndTime)('minute', e.target.value)}>
                    {Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : i.toString())).map(minute => (
                      <option key={minute} value={minute}>{minute}</option>
                    ))}
                  </select>
                  <select value={endTime.amPm} onChange={(e) => handleTimeChange(setEndTime)('amPm', e.target.value)}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="bfdfform-actions">
              <button type="submit" className="bfdfDFbtn bfdfdItemSaveBtn">Save</button><br />
              <button type="button" className="bfdfDFbtn bfdfdItemCancelBtn" onClick={() => navigate('/centralized-discount')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>

      {/* Select Item Modal */}
      <SelectItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelectItem={handleItemSelect} />
    </Layout>
  );
};

export default DiscountForm;
