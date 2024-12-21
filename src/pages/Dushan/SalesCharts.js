import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import Layout from './Layout';
import SalesChartsModal from './SalesChartsModal'; // Import the modal component
import './SalesCharts.css'; // Import the CSS file

// Registering components for Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const StoreDashboard = () => {
    const [salesData, setSalesData] = useState([]);
    const [storeID] = useState('S001'); // Hardcoded StoreID for now
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedChart, setSelectedChart] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/sales/${storeID}`); // Adjusted path
                setSalesData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching sales data');
                setLoading(false);
            }
        };

        fetchData();
    }, [storeID]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Define month order
    const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Grouping data by Category, Month, Revenue, Year
    const salesByCategory = salesData.reduce((acc, data) => {
        acc[data.category] = (acc[data.category] || 0) + data.quantity;
        return acc;
    }, {});

    const salesByMonth = salesData.reduce((acc, data) => {
        acc[data.month] = (acc[data.month] || 0) + data.quantity;
        return acc;
    }, {});

    const revenueByMonth = salesData.reduce((acc, data) => {
        acc[data.month] = (acc[data.month] || 0) + data.salePrice;
        return acc;
    }, {});

    const salesByYear = salesData.reduce((acc, data) => {
        acc[data.year] = (acc[data.year] || 0) + data.quantity;
        return acc;
    }, {});

    // Sorting months in order
    const sortedMonths = monthOrder.filter(month => salesByMonth[month] !== undefined);
    
    const monthChartData = {
        labels: sortedMonths,
        datasets: [{
            label: 'Sales by Month',
            data: sortedMonths.map(month => salesByMonth[month] || 0),
            backgroundColor: '#36A2EB',
        }]
    };

    const revenueChartData = {
        labels: sortedMonths,
        datasets: [{
            label: 'Revenue by Month ($)',
            data: sortedMonths.map(month => revenueByMonth[month] || 0),
            backgroundColor: '#FF6384',
        }]
    };

    // Data for Charts
    const categoryChartData = {
        labels: Object.keys(salesByCategory),
        datasets: [{
            label: 'Sales by Category',
            data: Object.values(salesByCategory),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        }]
    };

    const yearChartData = {
        labels: Object.keys(salesByYear),
        datasets: [{
            label: 'Sales by Year',
            data: Object.values(salesByYear),
            backgroundColor: '#4BC0C0',
        }]
    };

    return (
        <Layout>
            <div className="dashboard-container">
                <h1 className="dashboard-header">Sales Overview</h1>

                <div className="chart-container">
                    {/* Sales by Month */}
                    <div className="chart-box" onClick={() => setSelectedChart('month')}>
                        <h3 className="chart-title">Sales by Month</h3>
                        <Bar data={monthChartData} />
                    </div>

                    {/* Revenue by Month */}
                    <div className="chart-box" onClick={() => setSelectedChart('revenue')}>
                        <h3 className="chart-title">Revenue by Month</h3>
                        <Line data={revenueChartData} />
                    </div>

                    {/* Sales by Category */}
                    <div className="chart-box" onClick={() => setSelectedChart('category')}>
                        <h3 className="chart-title">Sales by Category</h3>
                        <Pie data={categoryChartData} />
                    </div>

                    {/* Sales by Year */}
                    <div className="chart-box" onClick={() => setSelectedChart('year')}>
                        <h3 className="chart-title">Sales by Year</h3>
                        <Bar data={yearChartData} />
                    </div>
                </div>

                {/* Modal */}
                <SalesChartsModal
                    isOpen={selectedChart !== null}
                    onClose={() => setSelectedChart(null)}
                >
                    {selectedChart === 'month' && <Bar data={monthChartData} />}
                    {selectedChart === 'revenue' && <Line data={revenueChartData} />}
                    {selectedChart === 'category' && <Pie data={categoryChartData} />}
                    {selectedChart === 'year' && <Bar data={yearChartData} />}
                </SalesChartsModal>
            </div>
        </Layout>
    );
};

export default StoreDashboard;
