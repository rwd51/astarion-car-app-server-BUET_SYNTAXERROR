const request = require('supertest');
const { app, server } = require('../index');
const Car = require('../../models/car.model');
const User = require('../../models/user.model');
const mongoose = require('mongoose');

describe('Car Controller', () => {
  let sellerId;
  let carId;
  let token;

  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.TEST_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a test seller user
    const seller = new User({ name: 'Test Seller', email: 'seller@test.com', password: 'password', role: 'seller' });
    await seller.save();
    sellerId = seller._id;

    // Get a JWT token for authentication
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ name: 'Test Seller', password: 'password' });
    token = loginResponse.body.token;
  });

  afterAll(async () => {
    // Delete the test data from the database
    await User.deleteMany({ name: 'Test Seller' });
    await Car.deleteMany({ seller_id: sellerId });

    // Disconnect from the test database
    await mongoose.connection.close();

    // Close the server
    await server.close();
  });

  describe('GET /api/cars/:sellerId', () => {
    it('should return a list of cars for the seller', async () => {
      // Create a test car
      const car = new Car({ seller_id: sellerId, title: 'Test Car', description: 'Test Description', price: 10000, image_url: 'https://example.com/car.jpg', model_no: 'TC001' });
      await car.save();
      carId = car._id;

      const response = await request(app)
        .get(`/api/cars/${sellerId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.cars).toHaveLength(1);
      expect(response.body.cars[0].title).toBe('Test Car');
    });
  });

  describe('POST /api/cars/:sellerId', () => {
    it('should add a new car for the seller', async () => {
      const carData = {
        title: 'New Test Car',
        description: 'New Test Description',
        price: 20000,
        image_url: 'https://example.com/new-car.jpg',
        model_no: 'NTC001',
      };

      const response = await request(app)
        .post(`/api/cars/${sellerId}`)
        .send(carData)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Car added successfully');
      expect(response.body.car.title).toBe('New Test Car');
    });
  });

  // Add more tests for editCar, deleteCar, and other endpoints
});