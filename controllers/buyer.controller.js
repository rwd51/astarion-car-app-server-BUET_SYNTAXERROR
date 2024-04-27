const User = require("../models/user.model.js");
const Car = require('../models/car.model');
const getAllCars = async (req, res) => {
    try {
      const cars = await Car.find().populate('seller_id', 'name email');
      res.status(200).json(cars);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch car lists' });
    }
  };
  const searchCars = async (req, res) => {
    const searchQuery = req.query.search;
    try {
      const cars = await Car.find({ $text: { $search: searchQuery } }).populate('seller_id', 'name email');
      res.status(200).json(cars);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search for cars' });
    }
  };

  const sendRequestToBuyCar = async (req, res) => {
    const { carId } = req.params;
    const buyerId = req.user.id; // Assuming authenticated user's ID is available in req.user
    
    try {
      const car = await Car.findById(carId);
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
      
      if (car.sold) {
        return res.status(400).json({ error: 'Car is already sold' });
      }
      
      const existingRequest = car.requests.find(request => request.buyer_id.equals(buyerId));
      if (existingRequest) {
        return res.status(400).json({ error: 'You have already sent a request to buy this car' });
      }
  
      car.requests.push({ buyer_id: buyerId });
      await car.save();
      
      res.status(200).json({ message: 'Request sent successfully' });
    } catch (error) {
      res.status(500).json({ error: `Failed to send request to buy car: ${error.message}` });
    }
  };
  const viewPurchasedCars = async (req, res) => {
    try {
      // Extract the buyer ID from the request
      const buyerId = req.user.id;
  
      // Find cars where the buyer has made purchases
      const purchasedCars = await Car.find({ 'purchases.buyer_id': buyerId })
                                     .populate('seller_id', 'name email');
  
      // Return the purchased cars
      res.status(200).json(purchasedCars);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch purchased cars' });
    }
  };
  const viewRequestedCars = async (req, res) => {
    try {
      // Extract the seller ID from the request
      const sellerId = req.user.id;
  
      // Find cars posted by the seller where there are pending requests
      const carsWithRequests = await Car.find({ 'requests.status': 'pending', seller_id: sellerId })
                                        .populate('seller_id', 'name email');
  
      // Return the cars with pending requests for the specific seller
      res.status(200).json(carsWithRequests);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch requested cars' });
    }
  };
  
  

  module.exports = {
    getAllCars,
    searchCars,
    sendRequestToBuyCar,
    viewPurchasedCars,
    viewRequestedCars
  };