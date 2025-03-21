import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import treatmentRoutes from "./routes/treatmentRoutes.js";
import clinicRoutes from "./routes/clinicRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();

connectDb();

app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.use("/api/users", userRoutes);
app.use("/api/treatments", treatmentRoutes);
app.use("/api/clinics", clinicRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
