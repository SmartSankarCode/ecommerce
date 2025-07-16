const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  deleteUser,
  getAllUsers
} = require("../controllers/userController");
const { protect, isAdmin } = require("../middlewear/authMiddlewear");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);

// admin routes
router.delete("/:id", protect, isAdmin, deleteUser);
router.get("/", protect, isAdmin, getAllUsers);


module.exports = router;
