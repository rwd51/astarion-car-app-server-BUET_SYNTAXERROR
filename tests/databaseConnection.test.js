const { MongoClient } = require('mongodb');

describe('Database Connection', () => {
  let connection;
  let db;

  beforeAll(async () => {
    const { mongoURI } = require('./middlewares/db'); // Importing the MongoDB URI from db.js
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    connection = await client.connect();
    db = connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  test('should connect to the MongoDB database', async () => {
    expect(connection.topology.isConnected()).toBe(true);
  });
});
