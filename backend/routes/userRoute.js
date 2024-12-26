const express = require("express");
const {
  createUserValidator,
  loginUserValidator,
  updatePasswordValidator,
} = require("../validators/userValidator");
const router = express.Router();
const validateRequest = require("../middlewares/validate");
const {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  getUserDetails,
} = require("../controllers/userController");
const { protect } = require("../middlewares/auth");

/* GET users listing. */
router.post("/register", createUserValidator, validateRequest, registerUser);
router.post("/login", loginUserValidator, validateRequest, loginUser);
router.get("/logout",protect, logoutUser);
router.put("/password/update", protect, updatePasswordValidator, validateRequest, changePassword);
router.get("/getdetail", protect, validateRequest, getUserDetails);

module.exports = router;
