const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
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

// Adding helmet to enhance security
app.use(helmet());

// Adding morgan to log http requests
app.use(morgan("combined"));

// configuring cors
app.use(cors({ origin: "http://localhost:3000" }));

// Setting up routes files
app.use("/", userRouter);
app.use("/admin", adminRouter);

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
