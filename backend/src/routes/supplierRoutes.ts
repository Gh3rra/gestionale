import express from "express";
import {} from "../controllers/customerController.js";
import { auth } from "../middleware/auth.js";
import {
  getAllSuppliers,
  getSupplier,
  insertSupplier,
} from "../controllers/supplierController.js";

const router = express.Router();

router.get("/", auth, getAllSuppliers);
router.get("/:id", auth, getSupplier);

router.post("/", auth, insertSupplier);

export default router;
