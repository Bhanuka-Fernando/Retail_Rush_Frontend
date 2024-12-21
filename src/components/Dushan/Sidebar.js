// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import logo from './RetailRushLogo.png';
import LogoutButton from '../Banuka/Logout';

const Sidebar = () => {
    return (
        <div style={styles.sidebar}>
            {/* Logo Section */}
            <div style={styles.logoContainer}>
                <img src={logo} alt="Retail Rush Logo" style={styles.logo} />
            </div>

            {/* Navigation Links */}
            <ul style={styles.ul}>
                <li style={styles.li}><Link to="/profile" style={styles.link}>Profile</Link></li>
                <li style={styles.li}><Link to="/products" style={styles.link}>Products</Link></li>
                <li style={styles.li}><Link to="/sales" style={styles.link}>Sales</Link></li>
                <li style={styles.li}><Link to="/centralized-discount" style={styles.link}>Discounts</Link></li>
                <li style={styles.li}><Link to="/reviews" style={styles.link}>Reviews</Link></li>
                <li style={styles.li}><Link to="/team" style={styles.link}>Team</Link></li>
                <li style={styles.li}><Link to="/support" style={styles.link}>Support</Link></li> {/* Corrected route */}
                <li style={styles.li}><LogoutButton/></li> {/* Corrected route */}

            </ul>
        </div>
    );
};

const styles = {
    sidebar: {
        height: '100vh',
        width: '250px',
        position: 'fixed',
        top: '0',
        left: '0',
        backgroundColor: '#000', // Black background color
        paddingTop: '20px', // Adjust to leave space for logo
        color: '#fff',
        boxSizing: 'border-box',
        overflowY: 'auto', // Add scrollbar if content overflows
        fontFamily: 'Poppins, sans-serif', // Use Poppins font
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.4)', // Add shadow effect
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '60px', // Adjust height as needed
        backgroundColor: '#000', // Black background color to match the sidebar
    },
    logo: {
        maxHeight: '50px',
        maxWidth: '180px',
        objectFit: 'contain',
    },
    ul: {
        listStyleType: 'none',
        padding: 0,
        marginTop: '20px', // Adjust to leave space for logo
    },
    li: {
        padding: '15px 20px',
        textAlign: 'left',
    },
    link: {
        color: '#fff', // White text color
        textDecoration: 'none', // Remove underline
        display: 'block', // Make link fill the list item
        fontSize: '1.2rem', // Increase font size
        padding: '10px', // Add padding for better click area
        borderRadius: '4px', // Add rounded corners
    },
};

export default Sidebar;
