import React from 'react';
import { Layout, Menu, Input } from 'antd';
import { HeartOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import './Header.css'; // Import your CSS for styling
import LogoutButton from './Logout';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const HeaderComponent = () => {
  const navigate = useNavigate();
  return (
    <>
    <Header className="header">
      <div className="logo">
        <img style={{objectFit:'scale-down',width:'100px',height:'75px',paddingTop:'25px'}} src={require('../../Images/Dushan/RetailRushLogo.png')} ></img>
      </div>
      <Menu theme="light" mode="horizontal" className="menu" style={{backgroundColor:'black'}}>
        <Menu.Item key="1"><a href="/Banuka/Home">Home</a></Menu.Item>
        <Menu.Item key="2"><a href="/Banuka/filter">Products</a></Menu.Item>
        <Menu.Item key="3"><a href="/about">About</a></Menu.Item>
        <Menu.Item key="4"><a href="/contact">Contact</a></Menu.Item>
      </Menu>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingRight: '10px' }}>
        {/* Wishlist Icon */}
        <HeartOutlined className="heart-icon" onClick={() => navigate('/Banuka/wishlist')} style={{ fontSize: '24px', cursor: 'pointer' }} />

        {/* Logout Button */}
        <div>
          <LogoutButton />
        </div>
      </div>



    </Header>
    <div style={{ position: 'absolute', right: '40px', top: '15px', alignItems: 'center' }}>
      <UserOutlined style={{ color: 'white', fontSize: '24px', marginRight: '0px',marginLeft:'10px' }} />
      <p style={{ color: 'white', margin: 0 }}>{localStorage.getItem('UserName')}</p>
    </div>
   
    </>
  );
};

export default HeaderComponent;
