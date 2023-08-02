import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Modal, Tabs } from 'antd'; // Import Ant Design components
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const { Header } = Layout; // Destructure Header component from Layout
const { TabPane } = Tabs; // Destructure TabPane component from Tabs

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header style={{ background: 'dark', color: 'white' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} className='d-flex'>
          <Menu.Item key="home" as={Link} to='/'>
            Travel Destination Search
          </Menu.Item>
          <Menu.Item key="search" as={Link} to='/'>
            Search For A Destination
          </Menu.Item>
          {/* if user is logged in show saved destinations and logout */}
          {Auth.loggedIn() ? (
            <>
              <Menu.Item key="saved" as={Link} to='/saved'>
                See Your Destinations
              </Menu.Item>
              <Menu.Item key="logout" onClick={Auth.logout}>Logout</Menu.Item>
            </>
          ) : (
            <Menu.Item key="login-signup" onClick={() => setShowModal(true)}>
              Login/Sign Up
            </Menu.Item>
          )}
        </Menu>
      </Header>
      {/* set modal data up */}
      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        {/* tab container to do either signup or login component */}
        <Tabs defaultActiveKey='login'>
          <TabPane tab='Login' key='login'>
            <LoginForm handleModalClose={() => setShowModal(false)} />
          </TabPane>
          <TabPane tab='Sign Up' key='signup'>
            <SignUpForm handleModalClose={() => setShowModal(false)} />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default AppNavbar;
