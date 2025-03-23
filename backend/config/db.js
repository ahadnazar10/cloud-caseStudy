const mongoose = require("mongoose");

// Connect to MongoDB
function connectDB() {
  const connectionString =
    "mongodb+srv://Abhinav:Abhinav%402004@cluster0.8ousz.mongodb.net/testDB?retryWrites=true&w=majority&appName=Cluster0";

  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

module.exports = connectDB;
