import { Request, Response } from "express";

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

const welcome = (req: AuthenticatedUser, res: Response) => {
  const displayName = req.authenticatedUser?.name ?? "Visitante";

  res.json({ message: `Seja bem-vindo(a), ${displayName}!` });
};

export const publicController = {
  welcome,
};
