import { getSavedDestinationIds, saveDestinationIds, removeDestinationId } from './localStorage';

// Route to get logged-in user's info (needs the token)
export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  // Create a new user
  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  // Log in a user
  export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  // Save travel destination data for a logged-in user
export const saveDestination = (destinationData, token) => {
    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(destinationData),
    });
  };
  
  // Remove saved travel destination data for a logged-in user
  export const deleteDestination = (destinationId, token) => {
    return fetch(`/api/users/destinations/${destinationId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  
  // Make a search to Travel Advisor API for flight information
  export const searchFlights = (query) => {
    // Modify this function to construct the API URL and fetch data from the Travel Advisor API
    // Return the fetched data as needed
  };
  
  // Make a search to Travel Advisor API for attractions
  export const searchAttractions = (query) => {
    // Modify this function to construct the API URL and fetch data from the Travel Advisor API
    // Return the fetched data as needed
  };
  
  // Make a search to Travel Advisor API for restaurants
  export const searchRestaurants = (query) => {
    // Modify this function to construct the API URL and fetch data from the Travel Advisor API
    // Return the fetched data as needed
  };
  
 
  