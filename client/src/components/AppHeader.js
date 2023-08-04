import React from 'react';
import { DatePicker, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import './header.css';
import WanderJoLogo from '../assets/updatedWJ-logo.png';




const AppHeader = () => {
  return (
    // <div className="ant-menu ant-menu-light ant-menu-horizontal header-container">
    <div className="header-container">
      <div className="logo">
      <Link to="/" className="ant-menu-item ant-menu-item-only-child">
        <b>
          <img src={WanderJoLogo} alt="WanderJo Travel Planner" style={{ marginRight: '10px', opacity: 0.8 }} />
        </b>
      </Link>
      </div>
      <div className="search-container">
        <Input size="large" placeholder="Type your destination" className="search-input" />
        <DatePicker className="date-picker" />
        <Button type="primary" className="search-button">Search</Button>
      </div>
    </div>
  );
};

export default AppHeader;