import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {

    const email = localStorage.getItem('userEmail');
    console.log("logout button",email);
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');


    // Redirect to the login page or home page
    navigate('/');
  };

  return (
    <Button type="primary" onClick={handleLogout} style={{backgroundColor:'red'}}>
      Logout
    </Button>
  );
};

export default LogoutButton;
