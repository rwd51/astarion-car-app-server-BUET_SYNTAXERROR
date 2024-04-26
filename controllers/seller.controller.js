const Car = require('../models/car.model');
const User = require('../models/user.model');

// 1. Shows the list of cars the seller has
const getCarsBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const cars = await Car.find({ seller_id: sellerId });
    res.status(200).json({ success: true, cars });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch cars' });
  }
};

// 2. Seller adding car details
const addCar = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { title, description, price, image_url, model_no } = req.body;

    const newCar = new Car({
      seller_id: sellerId,
      title,
      description,
      price,
      image_url,
      model_no
    });

    await newCar.save();
    res.status(201).json({ success: true, message: 'Car added successfully', car: newCar });
  } catch (error) {
    console.error('Error adding car:', error);
    res.status(500).json({ success: false, message: 'Failed to add car' });
  }
};

// 3. Seller editing car details
const editCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const { title, description, price, image_url, model_no } = req.body;

    const updatedCar = await Car.findByIdAndUpdate(carId, {
      title,
      description,
      price,
      image_url,
      model_no
    }, { new: true });

    if (!updatedCar) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    res.status(200).json({ success: true, message: 'Car updated successfully', car: updatedCar });
  } catch (error) {
    console.error('Error editing car:', error);
    res.status(500).json({ success: false, message: 'Failed to edit car' });
  }
};

// 4. Seller deleting car details
const deleteCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    res.status(200).json({ success: true, message: 'Car deleted successfully', car: deletedCar });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ success: false, message: 'Failed to delete car' });
  }
};
const acceptRequest = async (req, res) => {
    try {
      // Extract the car ID and request ID from the request body
      const { carId, requestId } = req.body;
  
      // Find the car by ID
      const car = await Car.findById(carId);
  
      // Check if the car exists
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
  
      // Find the request in the car's requests array
      const request = car.requests.find(req => req._id.toString() === requestId);
  
      // Check if the request exists
      if (!request) {
        return res.status(404).json({ error: 'Request not found' });
      }
  
      // Set the request status as delivered
      request.status = 'delivered';
  
      // Save the updated car document
      await car.save();
  
      // Update the buyer's purchases
      const buyerId = request.buyer_id;
      const purchase = {
        car_id: carId,
        transaction_date: new Date(),
        amount: car.price // You may adjust this based on your business logic
      };
  
      // Find the buyer and push the new purchase to their purchases array
      await User.findByIdAndUpdate(buyerId, { $push: { purchases: purchase } });
  
      // Return a success response
      res.status(200).json({ message: 'Request delivered successfully' });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Failed to deliver request' });
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
  const viewDeliveredCars = async (req, res) => {
    try {
      // Extract the seller ID from the request
      const sellerId = req.user.id;
  
      // Find cars posted by the seller where there are delivered requests
      const carsWithDeliveredRequests = await Car.find({ 'requests.status': 'delivered', seller_id: sellerId })
                                                  .populate('seller_id', 'name email');
  
      // Return the cars with delivered requests for the specific seller
      res.status(200).json(carsWithDeliveredRequests);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch delivered cars' });
    }
  };
  
  
    

module.exports = {
  getCarsBySeller,
  addCar,
  editCar,
  deleteCar,
  acceptRequest,
  viewRequestedCars,
  viewDeliveredCars
};
