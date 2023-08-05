import React from 'react';
import { Link } from 'react-router-dom';
import WanderJoLogo from '../assets/WanderJoLogo.png';

const Logo = () => {
  return (
    <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/">
        <img
        src={WanderJoLogo}
        alt="WanderJo Travel Planner"
        style={{  marginRight: '10px', height: '80px' }}
        />
        </Link>
    </div>
  );
};

export default Logo;