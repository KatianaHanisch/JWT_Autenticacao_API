import express from "express";

export const privateRouter = express.Router();

privateRouter.get("/", (req, res) => {
  res.send("Hello, TypeScript Express!");
});
