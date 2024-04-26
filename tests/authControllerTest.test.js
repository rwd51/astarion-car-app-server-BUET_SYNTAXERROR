require("dotenv").config();
const { server, app } = require("../index");
const request = require("supertest");
const { MongoClient } = require("mongodb");

describe("Auth controller test", () => {
  let testUserNames = [];
  let connection;
  let db;
  afterAll(async () => {
    server.close();
    const uri = process.env._MONGO_URI; 
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection = await client.connect();
    db = connection.db();
    const collection = db.collection("users");

    await collection.deleteMany({ name: { $in: testUserNames } });
    await connection.close();
  });

  test("New Registration", async () => {
    const name = "Jamal";
    const email = "jamal@gmail.com";
    const password = "12312";
    const role = "buyer";
    jest.setTimeout(10000);
    const response = await request(app)
      .post("/api/auth/register")
      .send({name, email, password , role});

    testUserNames.push(name);
    expect(response.body.message).toBe("Registration successful");
  });

  test("Login Test", async () => {
    const name="Jamal";
    const password = "12312";
    const response = await request(app)
      .post("/api/auth/login")
      .send({ name, password });
    expect(response.body.message).toBe("Login successful");
  });


  test("Duplicate Registration", async () => {
    const name = "Jamal";
    const email = "jamal@gmail.com";
    const password = "12312";
    const role = "buyer";
    const response = await request(app)
      .post("/api/auth/register")
      .send({  name, email, password ,role});

    expect(response.body.message).toBe("User already exists");
  });


});