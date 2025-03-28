// Import required modules
// const app = require("./app");
// const bodyParser = require("body-parser");

// const port = process.env.PORT || 9000;
//const port = 9000;
// Middleware to parse JSON
//app.use(bodyParser.json());

/*
// Define a Mongoose schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
});

// Create a Mongoose model
const User = mongoose.model('User', userSchema);

// POST route for creating a new user
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Basic GET route to check server status
app.get('/', (req, res) => {
  res.send('API is running! 🎯');
});
*/
// Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();
const port = 9000;

// Define allowed origins (including the Azure Static Web App domain)
const allowedOrigins = [
  "https://thankful-stone-066704310.6.azurestaticapps.net",
  "http://localhost:3000", // Add localhost for development, if needed
];

// Configure CORS to allow specific origins dynamically
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Allow requests from the specified origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow all other origins (default behavior)
      // Note: When credentials: true is set, we can't use '*' in the response header.
      // Instead, we reflect the request's origin back.
      return callback(null, origin);
    },
    credentials: true, // Required for cookies or sessions
  })
);
app.use(express.json());

connectDB();

// Import Routes
const announcementRoutes = require("./routes/announcements");
const grievanceRoutes = require("./routes/grievances");
app.use("/announcements", announcementRoutes);
app.use("/auth", authRoutes);
app.use("/grievances", grievanceRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
