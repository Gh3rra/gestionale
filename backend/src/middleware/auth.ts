import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  console.log("Auth middleware called");

  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Verify the token
    jwt.verify(
      token,
      env.JWT_SECRET,
      (err: jwt.VerifyErrors | null, decoded: any) => {
        console.log("Token verification result:", { err, decoded });
        if (err) {
          return res.status(403).json({ message: "Forbidden" });
        }
        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
