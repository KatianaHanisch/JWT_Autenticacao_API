import { Router } from "express";

import { publicController } from "../controllers/public-controller";
import { optionalAuth } from "../middlewares/auth-middleware";

export const publicRouter = Router();

publicRouter.get("/", optionalAuth, publicController.welcome);
