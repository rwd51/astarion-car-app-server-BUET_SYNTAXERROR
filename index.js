const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000; // Set your desired port

// Middleware
app.use(cors());
app.use(express.json());



// MongoDB connection URI
const mongoURI = 'mongodb+srv://ruwad45678:<password>@cluster0.9ts500q.mongodb.net/';

// Replace `<password>` with your actual password
const password = 'ubnaNwoVe0WCNeeR';
const connectionString = mongoURI.replace('<password>', password);

// Connect to MongoDB
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    // Start server after successful connection
    
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    // Exit the application if MongoDB connection fails
    process.exit(1);
  });


// Routes
// Add your routes here

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
