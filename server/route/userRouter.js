const express = require("express");
const userController = require("../controller/userController");
const UserModel=require("../model/userModel")
const userRoute = express.Router();

userRoute.use(express.json());

// Signup route
userRoute.post("/signup", userController.signupUser);
userRoute.get("/getdata", userController.getdata);

userRoute.get('/verify', async (req, res) => {
    try {
      const token = req.query.token;
      const user = await UserModel.findOne({ verificationToken: token });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
  
      user.isVerified = true;
      user.verificationToken = ''; // Optional: Clear the verification token
      await user.save();
  
      res.status(200).json({ message: 'Email verified successfully. Welcome to our platform!' });
    } catch (err) {
      console.error('Error during email verification:', err);
      res.status(500).json({ message: 'An error occurred during email verification' });
    }
  });
  

module.exports = userRoute;
