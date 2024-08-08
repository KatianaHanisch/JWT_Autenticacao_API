import { Request, Response } from "express";
import { userModel } from "../models/user-model";

const users = (req: Request, res: Response) => {
  const allUsers = userModel.findAll();

  res.status(200).json(allUsers);
};

const showUser = (req: Request, res: Response) => {
  const { id } = req.params;

  const user = userModel.findById(+id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
};

export const saveUser = (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof role !== "string" ||
    !role.match(/^(admin|standard)$/)
  ) {
    return res.status(400).json({ message: "Incorrect data types" });
  }

  const newUser = userModel.createUser(name, email, password, role);

  if (!newUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  res.status(201).json(newUser);
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;

  const user = userModel.findById(+id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = userModel.deleteUser(+id);

  if (!deletedUser) {
    return res.status(400).json({ message: "Could not delete user" });
  }

  res.status(200).json(deletedUser);
};

export const privateController = {
  users,
  showUser,
  saveUser,
  deleteUser,
};
