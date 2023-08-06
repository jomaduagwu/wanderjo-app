import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import DestinationList from './components/DestinationList';
import AttractionDetails from './components/AttractionDetails';
import ImageGallery from './components/ImageGallery';
import './App.css';

const App = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [activeScreen, setActiveScreen] = useState('Home');
  const handleSearch = async (searchTerm) => {
    try {
      const apiKey = 'ea081e7c8189b40b973d3d4c71f263d0';
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=imperial`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${apiKey}&units=imperial`;

      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('Unable to fetch weather data');
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      // Process weatherData and forecastData directly here
      const { name, main, weather } = weatherData;
      const { temp } = main;
      const description = weather[0].description;

      const forecastList = forecastData.list.slice(1, 4);
      const forecastDestinations = forecastList.map((forecastItem, index) => {
        const forecastDate = new Date(forecastItem.dt_txt);
        const formattedDate = `Day ${index + 1}: ${forecastDate.toLocaleDateString('en-US')}`;

        return {
          name: weatherData.name,
          date: formattedDate,
          temperature: forecastItem.main.temp,
          description: forecastItem.weather[0].description,
        };
      });

      const newDestinations = [
        {
          name,
          date: 'Today',
          temperature: temp,
          description,
        },
        ...forecastDestinations,
      ];

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
  return (
    <div className="app">
      <header>
      <nav className="navbar">
        <button onClick={() => setActiveScreen('Home')}>Home</button>
        <button onClick={() => handleSearch('Search History')}>Search History</button>
        <button onClick={() => handleSearch('Sign Up')}>Sign Up</button>
        <button onClick={() => handleSearch('Log In')}>Log In</button>
      </nav>
    </header>
      <Header />
      {activeScreen === 'Home' && <SearchBar onSearch={handleSearch} />}
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
  );
};

export default App;