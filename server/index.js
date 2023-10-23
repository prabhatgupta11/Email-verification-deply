const express=require("express");
const { connection } = require("mongoose");
const mongoose = require('mongoose');
const  userRoute  = require("./route/userRouter");

require("dotenv").config();
const app=express();

var cors = require('cors')

 
app.use(cors())


mongoose.connect("mongodb+srv://prabhat:prabhat@cluster0.nob5hjt.mongodb.net/testing1?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });

app.use(express.json());
app.use("/api", userRoute);

app.listen(4500, () => {
  console.log("Server is running at port 4500");
});
