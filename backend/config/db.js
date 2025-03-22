const mongoose = require('mongoose');

// Connect to MongoDB
function connectDB() {
  mongoose.connect('mongodb://127.0.0.1:27017/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

module.exports = connectDB;
