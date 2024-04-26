const { app } = require("../index");
const request = require("supertest");
const { MongoClient } = require("mongodb");
const Car = require('../models/car.model');
const User = require('../models/user.model');

describe("Seller Controller Tests", () => {
  let connection;
  let db;

  beforeAll(async () => {
    const uri = process.env._MONGO_URI;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection = await client.connect();
    db = connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  test("GET api/seller/cars/:sellerId", async () => {
    // Assuming you have a valid sellerId
    const sellerId = 'valid_seller_id';
    const response = await request(app).get(`/seller/cars/${sellerId}`);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  test("POST api/seller/cars/:sellerId", async () => {
    // Assuming you have a valid sellerId
    const sellerId = 'valid_seller_id';
    const newCarData = {
      title: 'New Car',
      description: 'Description of new car',
      price: 10000,
      image_url: 'http://example.com/image.jpg',
      model_no: '123ABC'
    };
    const response = await request(app)
      .post(`api/seller/cars/${sellerId}`)
      .send(newCarData);
    expect(response.status).toBe(201);
    // Add more assertions as needed
  });

  test("PUT api/seller/cars/:carId", async () => {
    // Assuming you have a valid carId
    const carId = 'valid_car_id';
    const updatedCarData = {
      title: 'Updated Car Title',
      description: 'Updated car description',
      price: 15000,
      image_url: 'http://example.com/updated-image.jpg',
      model_no: '456XYZ'
    };
    const response = await request(app)
      .put(`api/seller/cars/${carId}`)
      .send(updatedCarData);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  test("DELETE api/seller/cars/:carId", async () => {
    // Assuming you have a valid carId
    const carId = 'valid_car_id';
    const response = await request(app).delete(`/seller/cars/${carId}`);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  test("PUT api/seller/cars/request/accept", async () => {
    // Assuming you have a valid carId and requestId
    const carId = 'valid_car_id';
    const requestId = 'valid_request_id';
    const acceptRequestData = {
      carId,
      requestId
    };
    const response = await request(app)
      .put(`api/seller/cars/request/accept`)
      .send(acceptRequestData);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  test("GET api/seller/cars/requested", async () => {
    const response = await request(app).get(`/seller/cars/requested`);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  test("GET api/seller/cars/delivered", async () => {
    const response = await request(app).get(`/seller/cars/delivered`);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });
});
s