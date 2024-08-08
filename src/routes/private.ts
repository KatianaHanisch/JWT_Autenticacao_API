import { Router } from "express";

import { privateController } from "../controllers/private-controller";
import { ensureAdmin, ensureAuth } from "../middlewares/auth-middleware";

export const privateRouter = Router();

privateRouter.get("/users", ensureAuth, ensureAdmin, privateController.users);
