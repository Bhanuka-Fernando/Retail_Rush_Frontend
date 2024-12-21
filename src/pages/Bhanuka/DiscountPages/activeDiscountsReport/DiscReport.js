import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import autoTable for table creation
import './discReport.css'; // Import CSS file
import Layout from '../layout/Layout';

const DiscReport = () => {
  const [activeDiscounts, setActiveDiscounts] = useState([]);

  useEffect(() => {
    const fetchActiveDiscounts = async () => {
      try {
        const response = await fetch('/api/discount/discounts/');
        const json = await response.json();

        if (response.ok) {
          const currentDateTime = new Date();
          const activeDiscounts = json.filter(discount => {
            const endDateTime = new Date(discount.endDate);

            if (discount.endTime && discount.endTime.includes(':')) {
              endDateTime.setHours(...discount.endTime.split(':')); // Set end time to end date
            } else {
              console.warn(`Invalid or missing endTime for discount: ${discount.itemName}`);
              return false; // Skip invalid discounts
            }

            return endDateTime > currentDateTime; // Check if discount is still active
          });
          setActiveDiscounts(activeDiscounts);
        } else {
          console.error('Failed to fetch active discounts:', json.error);
        }
      } catch (error) {
        console.error('An error occurred while fetching active discounts:', error);
      }
    };

    fetchActiveDiscounts();
  }, []);

  // Function to download report as PDF
  const downloadReport = () => {
    const doc = new jsPDF(); // Create a new jsPDF instance

    // Set the title of the PDF
    doc.text('Active Discount Report', 14, 15);

    // Prepare table data
    const tableColumn = ['Item Name', 'Store ID', 'Discount %', 'Start Date', 'End Date', 'Item Image'];
    const tableRows = [];

    activeDiscounts.forEach(discount => {
      const discountData = [
        discount.itemName,
        discount.storeId,
        `${discount.discountPercentage}%`,
        new Date(discount.startDate).toLocaleString(),
        new Date(discount.endDate).toLocaleString(),
        discount.itemImage ? 'Image Available' : 'No Image' // Display "Image Available" or "No Image"
      ];
      tableRows.push(discountData);
    });

    // Add autoTable for table generation with formatting
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20, // Start table 20 units down from the top
      theme: 'grid', // Optional: you can also use 'striped' for a cleaner look
      headStyles: { fillColor: [41, 128, 185] }, // Set a custom color for the table header
      styles: { cellPadding: 2, fontSize: 10 }, // Adjust padding and font size for better spacing
    });

    // Save the PDF
    doc.save('active_discount_report.pdf');
  };

  return (
    <Layout>
      <div className="reportMainCon">
        <h4>Active Discount Report</h4>
        <hr />
      <div className="report-container">
        <button onClick={downloadReport} className="download-button">Download Report as PDF</button>
        {activeDiscounts.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Store ID</th>
                <th>Discount Percentage</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Item Image</th>
              </tr>
            </thead>
            <tbody>
              
              {activeDiscounts.map(discount => (
                <tr key={discount._id}>
                  <td>{discount.itemName}</td>
                  <td>{discount.storeId}</td>
                  <td>{discount.discountPercentage}%</td>
                  <td>{new Date(discount.startDate).toLocaleString()}</td>
                  <td>{new Date(discount.endDate).toLocaleString()}</td>
                  <td>
                    {discount.itemImage ? (
                      <img src={discount.itemImage} alt={discount.itemName} width={50} />
                    ) : (
                      'No Image'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No active discounts available for the report.</p>
        )}
      </div>
      </div>
    </Layout>
  );
};

export default DiscReport;
