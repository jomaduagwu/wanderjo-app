const { Schema, model } = require('mongoose');

const travelDestinationSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      required: true,
    },
  });
  
  const TravelDestination = model('TravelDestination', travelDestinationSchema);
  
  module.exports = TravelDestination;
  