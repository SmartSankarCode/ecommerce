const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT token 
function generateToken(userId) {
  return jwt.sign({ id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d", // choice
    });
}

// Register User
async function registerUser(req, res) {
  const { name, email, password } = req.body;

  // best practice to validate both front and backend
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashed = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: hashed
  });

  // Set token in httpOnly cookie 
  // or you can also save token in localstorage frontend
  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  });

  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    message: "Registered successfully",
  });
}

// Login User
async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Checks the matching password 
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Set token in httpOnly cookie
  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  });

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    message: "Login successful",
  });
}

// Logout User (clear cookie) 
function logoutUser(req, res) {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logged out successfully" });
}

// user profile dashboard
async function getUserProfile(req, res) {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  });
}

// DELETE user (admin only)
// can modify code that user itself can delete its own account
async function deleteUser(req, res) {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Prevent deleting admin himself
  if (user.isAdmin) {
    return res.status(403).json({ message: "Cannot delete an admin" });
  }

  await user.deleteOne();
  res.status(200).json({ message: "User deleted successfully" });
}

// Get all users (admin only)
async function getAllUsers(req, res) {
  const users = await User.find().select("-password"); // Hide passwords
  res.status(200).json(users);
}

// you can implement code that admin can make user as admin
// ca implement code for updatepassword and profile

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  deleteUser,
  getAllUsers
};
