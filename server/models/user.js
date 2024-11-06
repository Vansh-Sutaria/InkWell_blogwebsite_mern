// user.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true }, // Changed from 'name' to 'username'
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
