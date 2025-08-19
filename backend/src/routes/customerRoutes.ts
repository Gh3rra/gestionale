import express from "express";
import {
  getAllCustomers,
  getJuridicalCustomer,
  getPrivateCustomer,
  insertJuridicalCustomer,
  insertPrivateCustomer,
} from "../controllers/customerController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllCustomers);
router.get("/private-customer/:id", auth, getPrivateCustomer);
router.get("/juridical-customer/:id", auth, getJuridicalCustomer);
router.post("/private-customer", auth, insertPrivateCustomer);
router.post("/juridical-customer", auth, insertJuridicalCustomer);

export default router;
