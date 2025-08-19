import express from "express";
import {
  getAllCommissions,
  createCommission,
  getNextCommissionNumber,
  getCommission,
} from "../controllers/commissionController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
router.get("/next-number", auth, getNextCommissionNumber);

router.get("/", auth, getAllCommissions);
router.get("/:id", auth, getCommission);

router.post("/", auth, createCommission);


export default router;
