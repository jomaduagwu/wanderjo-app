import { gql } from '@apollo/client';

// Mutation to login a user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation to add a user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation to save a travel destination
export const SAVE_TRAVEL_DESTINATION = gql`
  mutation saveTravelDestination($input: TravelDestinationInput!) {
    saveTravelDestination(input: $input) {
      _id
      name
      location
      description
      image
      category
    }
  }
`;

// Mutation to remove a travel destination
export const REMOVE_TRAVEL_DESTINATION = gql`
  mutation removeTravelDestination($destinationId: ID!) {
    removeTravelDestination(destinationId: $destinationId) {
      _id
      name
      location
      description
      image
      category
    }
  }
`;

