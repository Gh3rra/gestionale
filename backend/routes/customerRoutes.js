import express from "express";
import {
  getAllCustomers,
  insertJuridicalCustomer,
  insertPrivateCustomer,
} from "../controllers/customerController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllCustomers);

router.post("/private-customer", auth, insertPrivateCustomer);
router.post("/juridical-customer", auth, insertJuridicalCustomer);

export default router;
