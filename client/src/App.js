import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Row, Col} from 'antd';
import SearchBar from './components/Destination/SearchBar';
import DestinationList from './components/Destination/DestinationList';
import AttractionDetails from './components/Destination/AttractionDetails';
import ImageGallery from './components/Destination/ImageGallery'; 
import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import './assets/App.css';
// import '/antd/dist/antd.css';
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent form submission

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

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
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
    const forecastList = forecastData.list.slice(1, 6); 
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
  return (
    <ApolloProvider client={client}>
      <Router>
        <div style={{margin: '20px'}}>
          <StoreProvider>
            <Nav />
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
                placeholder="Search for a place ..."
              />
              <button type="submit">Search</button>
            </form>
            <div>
            <Row justify="center" gutter={[16, 16]}>
              <Col xs={24} md={16} lg={18}>
                {/* Pass the destinations state to the DestinationList component */}
                <DestinationList destinations={destinations} />
              </Col>
              
            </Row >
            {/* <Col xs={24} md={8} lg={6}> */}
                <ImageGallery searchTerm={destinations.length > 0 ? destinations[0].name : ''} />
                </div>
              {/* </Col> */}
            {/* Pass the destinations state to the DestinationList component */}
            {/* <DestinationList destinations={destinations} />
            <ImageGallery searchTerm={destinations.length > 0 ? destinations[0].name : ''} /> */}

            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route 
                path="/success" 
                element={<Success />} 
              />
              <Route 
                path="/orderHistory" 
                element={<OrderHistory />} 
              />
              <Route 
                path="/products/:id" 
                element={<Detail />} 
              />
              <Route 
                path="*" 
                element={<NoMatch />} 
              />
            </Routes>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
