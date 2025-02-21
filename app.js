const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("✅ Connected to DB");
  })
  .catch(console.error);

// Middleware setup
app.use(cors()); // ✅ Enable CORS before routes
app.use(express.json()); // ✅ Enable JSON parsing before routes

// Debugging line to check if app.js is loading mainRouter
console.log("✅ Loading Main Router...");

app.use("/", mainRouter); // Load main router

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;
