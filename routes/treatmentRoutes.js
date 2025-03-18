import express from "express";
import { showAllTreatments } from "../controllers/treatmentController.js";

const router = express.Router();

// 检查登录状态接口
router.get("/all", showAllTreatments);

export default router;
