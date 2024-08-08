import { Router } from "express";

import { privateController } from "../controllers/private-controller";
import { ensureAdmin, ensureAuth } from "../middlewares/auth-middleware";

export const privateRouter = Router();

privateRouter.get("/users", ensureAuth, ensureAdmin, privateController.users);
privateRouter.get(
  "/users/:id",
  ensureAuth,
  ensureAdmin,
  privateController.showUser
);

privateRouter.post(
  "/users",
  ensureAuth,
  ensureAdmin,
  privateController.saveUser
);

privateRouter.delete(
  "/users/:id",
  ensureAuth,
  ensureAdmin,
  privateController.deleteUser
);
