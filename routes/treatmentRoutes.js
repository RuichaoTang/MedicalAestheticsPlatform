import express from "express";
import {
  showAllTreatments,
  findOneTreatment,
} from "../controllers/treatmentController.js";

const router = express.Router();

// 检查登录状态接口
router.get("/all", showAllTreatments);
router.get("/:id", findOneTreatment);

export default router;
