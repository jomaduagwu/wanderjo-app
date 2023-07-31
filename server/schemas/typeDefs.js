const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }
# travel destinations and their info
  type TravelDestination {
    _id: ID!
    name: String!
    description: String!
    location: String!
    reviews: [Review]!
    ratings: Float
    images: [String]!
  }

# user reviews for travel destinations
type Review {
  _id: ID!
  travelerName: String!
  rating: Float!
  comment: String!
}

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
    travelDestinations: [TravelDestination]!
    travelDestination(destinationId: ID!): TravelDestination
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateProfile(name: String, email: String, password: String): Profile
    removeProfile: Profile
    addTravelDestination(
      name: String!
      description: String!
      location: [String]!
    ): TravelDestination
    addReview(
      destinationId: ID!
      travelerName: String!
      rating: Float!
      comment: String!
    ): TravelDestination
    
  }
`;

module.exports = typeDefs;
