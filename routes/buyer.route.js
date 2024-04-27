const express = require("express");
const authorize = require("../middleware/auth.middleware.js");
const router = express.Router();
const { getAllCars, searchCars, sendRequestToBuyCar ,viewPurchasedCars ,viewRequestedCars } = require("../controllers/buyer.controller.js");



router.get('/getAllCars', getAllCars);

// Route to search for cars
router.get('/cars', searchCars);

// Route to send a request to buy a car
router.post('/cars/:carId/request', authorize, sendRequestToBuyCar);

// Route to view purchased cars by the authenticated user
router.get('/cars/purchased', authorize, viewPurchasedCars);

// Route to view cars with pending requests for the authenticated seller
router.get('/cars/requests', authorize, viewRequestedCars);


module.exports = router;