import React, { useState } from 'react';

const TravelSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const apiKey = '825aba17f9msh64bccc25c0492e3p1a9435jsne668cc4de59a';
      const url = `https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=${searchQuery}&lang=en_US&units=km`;

      // Use Fetch API directly 
      const response = await fetch(url, {
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResults(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your search query"
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <h2>Results:</h2>
        <ul>
          {results.map((result) => (
            <li key={result.result_object.location_id}>
              {result.result_object.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TravelSearch;
