import React  from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import 'antd/dist/reset.css'; 
import { Layout } from 'antd'; 

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppHeader from './components/AppHeader'; 
import Home from './pages/Home';
import SavedDestinations from './pages/SavedDestinations';
import PageContent from './components/PageContent';
import AppFooter from './components/AppFooter';
import Navbar from './components/Navbar';

import './App.css';
import './index.css';
import AppNavbar from './components/Navbar';

const { Header: AntdHeader } = Layout;

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
        <Navbar  />
        <AntdHeader>
          <AppHeader  />
        </AntdHeader>
        {/* <Header style={{ background: '#1890ff', padding: '0 20px' }}>
          <AppHeader />
        </Header> */}
        {/* <Logo /> */}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/saved' component={SavedDestinations} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
          <AppFooter />  
        </>
      </Router>
    </ApolloProvider>

  );
}

export default App;
