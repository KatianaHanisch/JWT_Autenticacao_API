import { Request, Response, NextFunction } from "express";

import Jwt, { JwtPayload } from "jsonwebtoken";
import { userModel } from "../models/user-model";

type UserProps = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
};

interface AuthenticatedUser extends Request {
  authenticatedUser?: UserProps;
}

interface CustomJwtPayload extends JwtPayload {
  id: number;
}

export const optionalAuth = (
  req: AuthenticatedUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next();
  } else {
    const secretKey: string | undefined = process.env.SECRETKEY;

    const token = authHeader.split(" ")[1];

    try {
      const decoded = Jwt.verify(token, secretKey!) as CustomJwtPayload;

      const user = userModel.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.authenticatedUser = user;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};

export const ensureAuth = (
  req: AuthenticatedUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secretKey: string | undefined = process.env.SECRETKEY;

    const decoded = Jwt.verify(token, secretKey!) as CustomJwtPayload;

    const user = userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.authenticatedUser = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const ensureAdmin = (
  req: AuthenticatedUser,
  res: Response,
  next: NextFunction
) => {
  if (req.authenticatedUser?.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Permission denied" });
  }
};
