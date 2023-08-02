import { gql } from '@apollo/client';

// Query to get the currently logged-in user's information
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      travelCount
      savedTravelDestinations {
        _id
        name
        location
        description
        image
        category
      }
    }
  }
`;

// Query to get all travel destinations
export const GET_TRAVEL_DESTINATIONS = gql`
  query travelDestinations {
    travelDestinations {
      _id
      name
      location
      description
      image
      category
    }
  }
`;


