const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connect to DB");
  })
  .catch(console.error);

//middleware
app.use(express.json());

app.use("/", mainRouter);

//start the server
app.listen(PORT, () => {
  console.log(`Serve is running on port ${PORT}`);
});

module.exports = app;
