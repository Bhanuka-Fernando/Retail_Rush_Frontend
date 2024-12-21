// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router

const Navbar = () => {
    return (
        <div style={styles.navbar}>
            <div style={styles.menu}>
                <Link to="/messages" style={styles.link}>Messages</Link>
                <Link to="/notifications" style={styles.link}>Notifications</Link>
                <Link to="/profile" style={styles.link}>My Account</Link>
            </div>
        </div>
    );
};

const styles = {
    navbar: {
        width: 'calc(100% - 250px)', // Adjust width to fit within the viewport considering the sidebar width
        height: '80px',
        backgroundColor: '#f5f5f5', // Ash background color
        display: 'flex',
        justifyContent: 'flex-end', // Align items to the right
        alignItems: 'center',
        padding: '0 20px',
        boxSizing: 'border-box',
        position: 'fixed',
        top: '0',
        left: '250px', // Offset by the width of the sidebar
        zIndex: 1,
        fontFamily: 'Poppins, sans-serif', // Use Poppins font
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow effect
    },
    menu: {
        display: 'flex',
        gap: '20px',
    },
    link: {
        color: '#000', // Black text color
        textDecoration: 'none',
        fontSize: '1rem', // Increase font size if needed
    }
};

export default Navbar;
