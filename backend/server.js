require("dotenv").config();
const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const khotianRoute = require("./routes/khotianRoute");

//middleware
app.use(express.json()); //to grab all fields from req object
app.use(morgan("dev"));

//routes
app.use("/api/khotian", khotianRoute);

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`DB CONNECTED BRO!`.blue.bold);
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`.cyan.bold.italic);
    });
  })
  .catch((err) => {
    console.log(`DB CONNECTED failed!`.red.bold);
  });
