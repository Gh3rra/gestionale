import express from "express";

const router = express.Router();
import {
  register,
  login,
  logout,
  getUser,
} from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";

router.post("/register", register);

router.post("/login", login);
router.get("/user", auth, getUser);

router.post("/logout", auth, logout);

export default router;
