const { Profile } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc'); // update?

const resolvers = {
  Query: {
  profiles: async () => {
    return Profile.find();
  },

  profile: async (parent, { profileId }) => {
    return Profile.findOne({ _id: profileId });
  },
  // By adding context to our query, we can retrieve the logged in user without specifically searching for them
  me: async (parent, args, context) => {
    if (context.user) {
      return Profile.findOne({ _id: context.user._id });
    }
    throw new AuthenticationError('You need to be logged in!');
  },
  travelDestinations: async() => {
    return TravelDestination.find();
  },
  travelDestination: async (parent, {destinationId}) => {
    return TravelDestination.findOne({_id: destinationId});
  },
},

Mutation: {
  addProfile: async (parent, { name, email, password }) => {
    const profile = await Profile.create({ name, email, password });
    const token = signToken(profile);

    return { token, profile };
  },
  login: async (parent, { email, password }) => {
    const profile = await Profile.findOne({ email });

    if (!profile) {
      throw new AuthenticationError('No profile with this email found!');
    }

    const correctPw = await profile.isCorrectPassword(password);

    if (!correctPw) {
      throw new AuthenticationError('Incorrect password!');
    }

    const token = signToken(profile);
    return { token, profile };
  },
  
  // Set up mutation so a logged in user can only remove their profile and no one else's
  removeProfile: async (parent, args, context) => {
    if (context.user) {
      return Profile.findOneAndDelete({ _id: context.user._id });
    }
    throw new AuthenticationError('You need to be logged in!');
  },

  addTravelDestination: async (parent, { name, description, location, images }) => {
    return TravelDestination.create({ name, description, location, images });
  },
  addReview: async (parent, { destinationId, travelerName, rating, comment }) => {
    // You may want to perform additional validation before adding a review.
    const destination = await TravelDestination.findById(destinationId);
    if (!destination) {
      throw new Error('Travel destination not found!');
    }
    
    const newReview = {
      travelerName,
      rating,
      comment,
    };
    
    destination.reviews.push(newReview);
    await destination.save();
    
    return destination;
  },
},
}
    

module.exports = resolvers;
