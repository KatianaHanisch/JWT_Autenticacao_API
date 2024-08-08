import { Request, Response } from "express";
import { userModel } from "../models/user-model";

const users = (req: Request, res: Response) => {
  const allUsers = userModel.findAll();

  res.status(200).json(allUsers);
};

export const privateController = {
  users,
};
