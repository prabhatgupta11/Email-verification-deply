const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  isVerified: Boolean,
  verificationToken: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
