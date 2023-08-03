import React from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';


// const nav_links = [
//     {
//         path: '/home',
//         display: 'Home'
//     },
//     {
//         path: '/about',
//         display: 'About'
//     },
//     {
//         path: '/travel',
//         display: 'Travel'
//     },
    
// ]
const {  Header } = Layout;

const AppHeader = () => {
  return (
    <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div>
        <span style={{ marginRight: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>
          WanderJo Travel Planner
        </span>
      </div>
      <Menu theme= "light" mode="horizontal" defaultSelectedKeys={['home']}>
        <Menu.Item key="home" as={Link} to="/">
          Home
        </Menu.Item>
        <Menu.Item key="login" as={Link} to="/login">
          Login
        </Menu.Item>
      </Menu>
    </Header>
    // <><header className='header'>
    //       <Container>
    //           <Row justify='space-between' align='middle'>
    //               {/* Logo */}
    //               <div className='logo'>
    //                   <Link to='/'>
    //                       <img
    //                           src='../assets/WanderJoLogo.png'
    //                           alt='WanderJo Travel Planner' />
    //                   </Link>
    //               </div>

    //               {/* Navigation Links */}
    //               <Menu mode='horizontal' theme='dark' style={{ lineHeight: '64px' }}>
    //                   {nav_links.map((link) => (
    //                       <Menu.Item key={link.path}>
    //                           <NavLink to={link.path}>{link.display}</NavLink>
    //                       </Menu.Item>
    //                   ))}
    //               </Menu>
    //           </Row>
    //       </Container>
    //   </header><div>
    //           Header
    //       </div></>
  )
}


export default AppHeader
