import express from "express";
import {
  importCommissions,
  importCustomer,
  importMeasures,
  importPaymentMode,
  importPaymentTerms,
  importStates,
  importSupplier,
  importWorker,
  importCommissionCustomer,
  importCommissionDiscount,
  importCommissionIncome,
  importMaterials,
} from "../controllers/importController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/commission", auth, importCommissions);
router.post("/measures", auth, importMeasures);
router.post("/worker", auth, importWorker);
router.post("/payment-mode", auth, importPaymentMode);
router.post("/payment-terms", auth, importPaymentTerms);
router.post("/supplier", auth, importSupplier);
router.post("/states", auth, importStates);
router.post("/customer", auth, importCustomer);
router.post("/material", auth, importMaterials);
router.post("/commission-customer", auth, importCommissionCustomer);
router.post("/discounts", auth, importCommissionDiscount);
router.post("/incomes", auth, importCommissionIncome);

export default router;
