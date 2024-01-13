require("dotenv").config();
const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const khotianRoute = require("./routes/khotianRoute");
const userRoute = require("./routes/userRoute");
const resourceLinkRoute = require("./routes/resourceLinkRoute");
const slideRoute = require("./routes/slideRoute");
const termFinalRoute=require("./routes/termFinalRoute")
const routineRoute=require("./routes/routineRoute");

//middleware
app.use(cors());
app.use(express.json()); //to grab all fields from req object
app.use(morgan("dev"));

//routes

app.use("/api/khotian", khotianRoute);
app.use("/api/resource", resourceLinkRoute);
app.use("/api/slide",slideRoute)
app.use("/api/termfinal",termFinalRoute)
app.use("/api/routine",routineRoute)
app.use("/api/user",userRoute)


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
