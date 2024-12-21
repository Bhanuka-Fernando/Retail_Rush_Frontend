import React, { useState } from 'react';
import Layout from './Layout'; // Assuming Layout is in the components folder
import './SalesData.css'; // Import the CSS file
import salesLogo from './SalesLogo.png'; // Adjust path if necessary

const SalesData = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('csv', file);

        try {
            const response = await fetch('/api/sales/upload-csv', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage('CSV uploaded successfully!');
            } else {
                setMessage('Error uploading CSV.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Error uploading file.');
        }
    };

    return (
        <Layout>
            <div className="sales-data-container">
                <form className="sales-data-form" onSubmit={handleSubmit}>
                    <h2 className="sales-data-header">Upload Sales Sheet</h2>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="sales-data-input"
                    />
                    <button type="submit" className="sales-data-button">Upload</button>
                    {message && <p className="sales-data-message">{message}</p>}
                </form>
                <img src={salesLogo} alt="Sales Logo" className="sales-data-image" />
            </div>
        </Layout>
    );
};

export default SalesData;
