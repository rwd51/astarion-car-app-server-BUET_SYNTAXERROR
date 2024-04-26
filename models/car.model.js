const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'delivered'], // Possible statuses for the request
      default: 'pending' // Default status is 'pending'
    }
  });
  
  const carSchema = new mongoose.Schema({
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image_url: {
      type: String,
      required: true
    },
    sold: {
      type: Boolean,
      default: false // Default value is false, indicating the car is not sold
    },
    model_no: {
      type: String,
      required: true
    },
    requests: [requestSchema] // Array to store requests related to this car
  });
  
  const Car = mongoose.model('Car', carSchema);
  
  module.exports = Car;