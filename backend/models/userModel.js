const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple documents with null values
    validate: {
      validator: function (v) {
        return v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  phone: {
    type: Number,
    unique: true,
    sparse: true, // Allows multiple documents with null values
    validate: {
      validator: function (v) {
        return v && /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(v);
      },
      message: (props) =>
        `Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.`,
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9_]+$/.test(v);
      },
      message: (props) =>
        `Username can only contain letters, numbers, and underscores.`,
    },
  },
  fullname: {
    type: String,
    required: true,
    minlength: 2,
  },
  profilePic: {
    type: String,
    default:
      "https://res.cloudinary.com/dxkufsejm/image/upload/v1633453663/instaClone/default-profile-pic.jpg",
  },
  bio: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
