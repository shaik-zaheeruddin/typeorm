import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/auth";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET || "your-secret-key");

    // Add decoded user data to res.locals
    res.locals.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
