const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin'],
    required: true
  },
  cars_posted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  }],
  purchases: [{
    car_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car'
    },
    transaction_date: {
      type: Date,
      default: Date.now
    },
    amount: {
      type: Number,
      required: true
    }
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;