import { Request, Response } from "express";

import Jwt from "jsonwebtoken";

import { userModel } from "../models/user-model";

const register = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({ message: "Incorrect data types" });
  }

  const registreredUser = userModel.registerUser(name, email, password);

  if (!registreredUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const userResgister = {
    id: registreredUser.id,
    name: registreredUser.name,
    email: registreredUser.email,
  };

  return res.status(201).json(userResgister);
};

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const secretKey: string | undefined = process.env.SECRETKEY;

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "Incorrect data types" });
  }

  const user = userModel.findByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Incorrect credentials" });
  }

  const playload = {
    id: user.id,
    email: user.email,
  };

  const token = Jwt.sign(playload, secretKey!, {
    expiresIn: "1d",
  });

  res.status(200).json({ token });
};

export const authController = {
  register,
  login,
};
