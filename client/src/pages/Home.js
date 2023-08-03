import React from 'react';
import AppHeader from '../components/AppHeader';
import TravelSearch from './TravelSearch';
import DestinationCard from '../components/DestinationCard';
import AppFooter from '../components/AppFooter';


const Home = () => {
  // Replace this with actual search results data
  const searchResults = [
    {
      name: 'Destination 1',
      location: 'Location 1',
      description: 'Description 1',
      image: '/path/to/image1.png',
      category: 'Category 1',
    },
    {
      name: 'Destination 2',
      location: 'Location 2',
      description: 'Description 2',
      image: '/path/to/image2.png',
      category: 'Category 2',
    },
  ];

  return (
    <div>
      {/* <AppHeader /> */}
      <TravelSearch />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {searchResults.map((result, index) => (
          <DestinationCard key={index} {...result} />
        ))}
      </div>
      <AppFooter />
    </div>
  );
};

export default Home;
