import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Modal } from 'antd';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const { Header } = Layout;

const AppNavbar = ({ onTravelSearchClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <>
      <Header style={{ background: 'dark', color: 'white' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} className='d-flex'>
          <Menu.Item key="home" as={Link} to='/'>
            Home Search
          </Menu.Item>

          <Menu.Item key="signup" onClick={() => handleTabChange('signup')}>
            Sign Up
          </Menu.Item>

          <Menu.Item key="login" onClick={() => handleTabChange('login')}>
            Login
          </Menu.Item>
          
          {Auth.loggedIn() ? (
            <>
              <Menu.Item key="saved" as={Link} to='/saved'>
                See Your Destinations
              </Menu.Item>
              <Menu.Item key="logout" onClick={Auth.logout}>Logout</Menu.Item>
            </>
          ) : null}
        </Menu>
      </Header>
      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        {/* Render LoginForm or SignUpForm based on activeTab */}
        {activeTab === 'login' ? (
          <LoginForm handleModalClose={() => setShowModal(false)} />
        ) : (
          <SignUpForm handleModalClose={() => setShowModal(false)} />
        )}
      </Modal>
    </>
  );
};

export default AppNavbar;
