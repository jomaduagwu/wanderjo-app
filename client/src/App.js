<<<<<<< HEAD
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
=======
import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import DestinationList from './components/DestinationList';
import AttractionDetails from './components/AttractionDetails';
import ImageGallery from './components/ImageGallery'; // Import the ImageGallery component
import './App.css';

const App = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  const handleSearch = async (searchTerm) => {
    try {
      const apikey = 'ea081e7c8189b40b973d3d4c71f263d0';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apikey}&units=imperial`; 
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${apikey}&units=imperial`;

      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('Unable to fetch weather data');
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      // Update destinations state with the fetched data
      const newDestinations = processWeatherAndForecastData(weatherData, forecastData);
      setDestinations(newDestinations);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAttractionClick = (attraction) => {
    setSelectedAttraction(attraction);
  };

  const handleAttractionClose = () => {
    setSelectedAttraction(null);
  };

  const processWeatherAndForecastData = (weatherData, forecastData) => {
    // Extract relevant information from weatherData
    const { name, main, weather } = weatherData;
    const { temp } = main;
    const description = weather[0].description;
  
    // Extract relevant information from forecastData
    const forecastList = forecastData.list.slice(1, 4); 
    const forecastDestinations = forecastList.map((forecastItem, index) => {
      const forecastDate = new Date(forecastItem.dt_txt);
      const formattedDate = `Day ${index + 1}: ${forecastDate.toLocaleDateString('en-US')}`;
  
      return {
        name: weatherData.name,
        date: formattedDate, // Use the formatted date in the format "Day: Day 1: mm/dd/yyyy"
        temperature: forecastItem.main.temp,
        description: forecastItem.weather[0].description,
      };
    });
  
    // Create the newDestinations array with both current weather and forecast destinations
    const newDestinations = [
      {
        name,
        date: 'Today',
        temperature: temp,
        description,
      },
      ...forecastDestinations,
    ];
  
    return newDestinations;
  };
>>>>>>> 0a1b1f1 (delete file then create new filess, image galerry, place, travel destination)

  return (
<<<<<<< HEAD
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

=======
    <div className="app">
      <Header />
      <SearchBar onSearch={handleSearch} />
      {selectedAttraction ? (
        <AttractionDetails attraction={selectedAttraction} onClose={handleAttractionClose} />
      ) : (
        <>
          <DestinationList destinations={destinations} onAttractionClick={handleAttractionClick} />
          <ImageGallery searchTerm={destinations.length > 0 ? destinations[0].name : ''} />
        </>
      )}
      <footer>
        This is Project 3 From Rice
      </footer>
    </div>
>>>>>>> 0a1b1f1 (delete file then create new filess, image galerry, place, travel destination)
  );
};

export default App;
