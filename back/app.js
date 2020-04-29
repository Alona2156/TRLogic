const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

/* Routing */

const tasksRouter = require("./api/routes/tasks");

/* Connect to Mongo */

const mongoConnection = process.env.mongoUrl;
mongoose.connect(mongoConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).catch((error) => {
  console.log(error, "mongoose");
});

/* Start app */

const app = express();

/* Response parsing middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

/* Routing */
app.use("/api/tasks", tasksRouter);

/* Catch-all route */
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.set("Cache-Control", "no-cache");
    res.sendFile(path.resolve(__dirname, "../front/dist/index.html"));
  });
}

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err.stack);
  err.message = "An error occured, try again later";
  res.status(500).json({
    message: err.message
  });
});

const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || "80");
