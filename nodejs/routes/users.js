import express from "express";

import { User } from "../models/user.model.js";

export const userRouter = express.Router();

userRouter.route("/").get((req, res) => {
  User.find()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(400).json("Error get users : " + err);
    });
});

userRouter.route("/add").post((req, res) => {
  const user = new User({
    username: req.body.username,
  });

  user
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(400).json("Error adding user : " + err);
    });
});
