const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Increase the server selection timeout (if needed)
});

const connection = mongoose.connection;
connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

module.exports = {
  connection,
};
