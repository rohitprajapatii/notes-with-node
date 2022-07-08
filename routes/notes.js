const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /notes",
  });
});

router.post("/create", (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  res.status(201).json({
    message: "Handling POST requests to /createNote with title " + title,
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "Handling GET requests to /notes/" + id,
  });
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "Handling PATCH requests to /notes/" + id,
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "Handling DELETE requests to /notes/" + id,
  });
});

module.exports = router;
