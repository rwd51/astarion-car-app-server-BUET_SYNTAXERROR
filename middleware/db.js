const mongoose = require("mongoose");

const mongoURI = 'mongodb+srv://ruwad45678:<password>@cluster0.9ts500q.mongodb.net/';

// Replace `<password>` with your actual password
const password = 'ubnaNwoVe0WCNeeR';
const connectionString = mongoURI.replace('<password>', password);

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
        return connection;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        // Throw an error to handle in the index.js file
        throw error;
    }
}


module.exports = connectDB;