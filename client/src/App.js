import './App.css';
import React  from 'react';
import 'antd/dist/antd.css'; // Import Ant Design styles
import { Layout } from 'antd'; // Import Ant Design components
import Navbar from './components/Navbar'; // Import your custom AppNavbar component
import LoginForm  from './components/LoginForm';
import SignupForm from  './components/SignupForm';
import TravelSearch from './pages/TravelSearch';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content  style ={{ padding:  '20px'}}>
        <div>
          <h1>WanderJo Travel Planner</h1>
          <TravelSearch />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
