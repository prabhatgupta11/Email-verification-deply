const  UserModel  = require("../model/userModel");
const nodemailer = require("nodemailer");
const crypto=require("crypto")
require('dotenv').config()
const bcrypt = require("bcrypt");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "guptajim3636@gmail.com",
    pass: process.env.pass,
  },
});

const sendWelcomeEmail = async (email) => {
  const mailOptions = {
    from: "guptajim3636@gmail.com",
    to: email,
    subject: "Welcome to our platform!",
    text: "Thank you for signing up. We are excited to have you on board!",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully.");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Generate a unique verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Hash the password
    const hashpass = await bcrypt.hash(password, 10);

    // Create a new user with email, hashed password, and verification details
    const user = new UserModel({ email, password: hashpass, isVerified: false, verificationToken });

    await user.save();

    // Send an email with a verification link
    const verificationLink = `http://localhost:4500/api/verify?token=${verificationToken}`;


    const mailOptions = {
      from: "guptajim3636@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Click the following link to verify your email: ${verificationLink}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully.");

    res.status(201).json({ message: "Registration successful. Check your email for verification instructions.", user });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};


const getdata = async (req, res) => {
  try {
    const user = await UserModel.find()

    res.status(201).json({user});
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = {
  signupUser,
  getdata
};
