const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require("./middleware/db.js");

const app = express();
const PORT = process.env.PORT || 5000; // Set your desired port

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.route"));

connectDB();
const server=app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// connectDB()
//   .then(() => {
//     // Start server after successful connection
//     const server=app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     //module.exports={ app ,server};
//   })
//   .catch((err) => {
//     console.error('Failed to start server:', err.message);
//     // Exit the application if MongoDB connection fails
//     process.exit(1);
//   });

module.exports={ app ,server};





  

  

