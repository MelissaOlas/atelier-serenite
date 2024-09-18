import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }

  try {
    const decoded = jwt.verify(token, ${AUTHENT_KEY});
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};
