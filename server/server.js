const mongoose = require('mongoose');
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require('./routes/authroutes');
const blogRoutes = require('./routes/blogroutes');
require('dotenv').config(); // Load environment variables
const User = require('./models/user'); // Rename to 'User'

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key";

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error', err));

app.use(cors({
  origin: 'http://localhost:3000', // Adjust this based on where your frontend runs
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes); 

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists
  if (await User.findOne({ email })) { // Use 'User' here
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword }); // Use 'User' here

  try {
    await newUser.save(); // Save the user to the database
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const currUser = await User.findOne({ email }); // Use 'User' here
  if (!currUser) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, currUser.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ email: currUser.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
