const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const notes = require("./routes/notes");
const app = express();

app.use(morgan("dev"));

mongoose
  .connect(
    "mongodb+srv://Rohit123:" +
      "Rohit123" +
      "@cluster0.kihun.mongodb.net/?retryWrites=true&w=majority",
    {
      // useMongoClient: true,
    }
  )
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/notes", notes);

app.use((req, res, next) => {
  const error = Error("Not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
