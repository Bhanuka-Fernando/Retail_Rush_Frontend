import React from 'react';
import './Sidebar.css';

const Sidebar = () => (
  <div className="sidebar">
    <h3>Categories</h3>
    <ul>
      <li>Electronics</li>
      <li>Fashion</li>
      <li>Home & Kitchen</li>
      {/* More categories */}
    </ul>
  </div>
);

export default Sidebar;
