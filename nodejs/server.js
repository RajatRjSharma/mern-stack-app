import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

const dbUri = process.env.ATLAS_URI;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
});

const conn = mongoose.connection;

conn.on("error", (err) => {
  console.log("Error connecting to db : " + err);
});

conn.once("open", () => {
  console.log("DB connection successfull");
});

import { exerciseRouter } from "./routes/exercises.js";
import { userRouter } from "./routes/users.js";

app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Server is listening on port :" + port);
});
