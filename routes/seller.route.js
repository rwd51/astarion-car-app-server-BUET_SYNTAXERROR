const express = require("express");
const authorize = require("../middleware/auth.middleware.js");
const router = express.Router();
const {
  getCarsBySeller,
  addCar,
  editCar,
  deleteCar,
  acceptRequest,
  viewRequestedCars,
  viewDeliveredCars
} = require('../controllers/seller.controller');

// Route to get cars by seller
router.get('/cars/:sellerId', getCarsBySeller);

// Route to add a new car
router.post('/cars/:sellerId', addCar);

// Route to edit a car
router.put('/cars/:carId', editCar);

// Route to delete a car
router.delete('/cars/:carId', deleteCar);

// Route to accept a request and mark it as delivered
router.put('/cars/request/accept', acceptRequest);

// Route to view cars with pending requests for the seller
router.get('/cars/requested',authorize, viewRequestedCars);

// Route to view cars with delivered requests for the seller
router.get('/cars/delivered',authorize, viewDeliveredCars);

module.exports = router;
