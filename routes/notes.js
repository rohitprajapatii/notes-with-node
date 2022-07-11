const express = require("express");
const mongoose = require("mongoose");
const Notes = require("../models/notes");
const router = express.Router();

router.get("/", (req, res, next) => {
  Notes.find()
    .select("_id title content")
    .then((notes) => {
      const response = {
        count: notes.length,
        notes: notes,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching notes failed!",
        error: err,
      });
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Notes.findById(id)
    .select("_id title content")
    .then((note) => {
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/create", (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const newNote = new Notes({
    _id: mongoose.Types.ObjectId(),
    title: title,
    content: content,
  });
  newNote
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Note created successfully",
        createdNote: {
          _id: result._id,
          title: result.title,
          content: result.content,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const reqOps = {};
  body.forEach((el) => {
    reqOps[el.name] = el.value;
  });

  Notes.findById(id)
    .then((note) => {
      if (!note) {
        res.status(404).json({
          message: "Note not found",
        });
        return;
      } else {
        Notes.updateOne({ _id: id }, { $set: reqOps })
          .exec()
          .then((result) => {
            console.log(result);
            res.status(200).json({
              message: "Note updated successfully",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Notes.deleteOne({ _id: id })
    .exec()
    .then((_) => {
      res.status(200).json({
        message: "Note deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
