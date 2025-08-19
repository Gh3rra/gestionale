import express from "express";
import { getTableStatus } from "../controllers/adminController.js";

const router = express.Router();

router.get("/", getTableStatus);

export default router;
