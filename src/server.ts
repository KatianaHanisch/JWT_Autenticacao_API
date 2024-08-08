import express from "express";
import dotenv from "dotenv";

import { authRouter } from "./routes/auth";
import { publicRouter } from "./routes/public";
import { privateRouter } from "./routes/private";

const app = express();

dotenv.config();

app.use(express.json());

app.use(publicRouter);
app.use("/auth", authRouter);
app.use("/private", privateRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
