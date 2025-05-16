import express from "express";
import {
  getAllCommissions,
  createCommission,
} from "../controllers/commissionController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllCommissions);

router.post("/", auth, createCommission);

export default router;
