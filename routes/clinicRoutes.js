import express from "express";
import { showAllClinics } from "../controllers/clinicController.js";

const router = express.Router();

// 检查登录状态接口
router.get("/all", showAllClinics);

export default router;
