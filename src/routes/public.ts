import express from "express";

export const publicRouter = express.Router();

publicRouter.get("/", (req, res) => {
  res.send("Hello, TypeScript Express!");
});
