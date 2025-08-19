import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import commissionRoutes from "./routes/commissionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import importRoutes from "./routes/importRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { env } from "./config/env.js";

dotenv.config();

const app = express();
const PORT = env.PORT;

app.use(morgan("dev"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/commissions", commissionRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/import", importRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
