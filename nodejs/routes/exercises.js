import express from "express";
import mongoose from "mongoose";

import { Exercise } from "../models/exercise.model.js";

export const exerciseRouter = express.Router();

exerciseRouter.route("/").get((req, res) => {
  Exercise.find()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(400).json("Error getting exercises : " + err);
    });
});

exerciseRouter.route("/add").post((req, res) => {
  const exercise = new Exercise({
    username: req.body.username,
    description: req.body.description,
    duration: Number(req.body.duration),
    date: Date.parse(req.body.date),
  });

  exercise
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(400).json("Error saving exercise : " + err);
    });
});

exerciseRouter.route("/:id").get((req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .send("No Record with the given Id : " + req.params.id);
  else {
    Exercise.findById(req.params.id)
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        res.status(400).json("Error getting exercise by id : " + err);
      });
  }
});

exerciseRouter.route("/:id").delete((req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .send("No Record with the given Id : " + req.params.id);
  else {
    Exercise.findByIdAndDelete(req.params.id)
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        res.status(400).json("Error deleting exercise by id : " + err);
      });
  }
});

exerciseRouter.route("/update/:id").post((req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .send("No Record with the given Id : " + req.params.id);
  else {
    const user = {
      username: req.body.username,
      description: req.body.description,
      duration: Number(req.body.duration),
      date: Date.parse(req.body.date),
    };

    Exercise.findByIdAndUpdate(req.params.id, { $set: user }, { new: true })
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        res.status(400).json("Error updating exercise by id : " + err);
      });
  }
});
