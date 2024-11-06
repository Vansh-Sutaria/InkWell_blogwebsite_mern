// authcontroller.js
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const user = require('../models/user');

// Register new user
// authcontroller.js
const registerUser = async (req, res) => {
  const { username, email, password } = req.body; // Change 'name' to 'username'

  const userExists = await user.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await user.create({
    username, // Ensure this matches your model
    email,
    password: hashedPassword,
  });
  console.log({ newUser });

  return res.status(201).json({
    _id: newUser._id,
    username: newUser.username, // Change 'name' to 'username'
    email: newUser.email,
    token: generateToken(newUser._id),
  });
};


// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await user.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
};

module.exports = { registerUser, loginUser };
