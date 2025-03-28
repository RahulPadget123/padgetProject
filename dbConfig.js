const mongoose = require('mongoose');

async function connectMongoDB(url) {
  try {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err; // Re-throw the error to be caught by the caller
  }
}

module.exports = connectMongoDB;
