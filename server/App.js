const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const redis = require("redis");
const rediscl = redis.createClient();
const db = mongoose.connection;

// importing router files
const adminRouter = require("./routes/admins");
const userRouter = require("./routes/users");

// requiring env
require("dotenv").config();

// Initializing express application
const app = express();

// Adding express.json to parse json file into js objects
app.use(express.json());

// Adding cookie parser
app.use(cookieParser(process.env.COOKIE_KEY));

// Adding helmet to enhance security
app.use(helmet());

// Adding morgan to log http requests

// configuring cors
app.use(cors({ origin: "http://localhost:3000",credentials:true, methods:['GET','POST']}));

// Setting up routes files
app.use("/", userRouter);
app.use("/admin", adminRouter);

// Connecting to redis
rediscl.connect();

rediscl.on("connect", function () {
  console.log("Redis plugged in.");
});

rediscl.on("error", (err) => {
  console.log("Error" + err);
});

// Initializing connection to mongodb
mongoose.connect(process.env.MONGO_URL);
db.on("error", console.error.bind(console, "connection error :  "));
db.once("open", function () {
  console.log("connected successfully");
});

// Initializing server
const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
