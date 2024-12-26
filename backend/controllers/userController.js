const asyncHandler = require("../src/utils/asyncHandler");
const TokenManager = require("../src/utils/tokenManager");
const User = require("../models/userModel");
const { AppError } = require("../middlewares/errorHandler");

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { email, phone, password, username, fullname } = req.body;

  if ((!email || email.trim() === "") && !phone) {
    res.status(400);
    throw new AppError("Either email or phone number is required.", 400);
  }

  if (email) {
    const emailMatch = await User.findOne({ email: email });
    console.log("email: ", email);
    console.log("emailMatch: ", emailMatch);
    if (emailMatch) {
      throw new AppError("Email already in use", 400);
    }
  }
  // Check for phone match
  if (phone) {
    const phoneMatch = await User.findOne({ phone: phone });
    if (phoneMatch) {
      throw new AppError("Phone number already in use", 400);
    }
  }

  const newUser = await User.create({
    ...req.body,
    email: email || `${username}@no.Email`,
    phone: phone || `${username}@no.Phone`,
  });

  TokenManager.sendToken(newUser, "User Created Successfully", res);
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, phone, username, password } = req.body;

  if (!email && !phone && !username) {
    res.status(400);
    throw new AppError("Either email or phone or username is required.", 400);
  }

  const user = await User.findOne({
    $or: [{ email }, { phone }, { username }],
  }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    res.status(400);
    throw new AppError("Invalid credentials");
  }

  TokenManager.sendToken(user, "Login Successfull", res);
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "User logged out Successfully",
  });
});

// Change Password
const changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.comparePassword(oldPassword))) {
    return next(new AppError("Old Password is Incorrect!", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(
      new AppError("Confirm Password doesn't match Old Password", 400)
    );
  }

  user.password = newPassword;
  await user.save();

  TokenManager.sendToken(user, "Passwrod Updated Successfully", res);
});

// Get User Details
const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  getUserDetails,
};
