import express from "express";
import {
  showAllClinics,
  findOneClinic,
  searchByOwner,
} from "../controllers/clinicController.js";

const router = express.Router();

// 检查登录状态接口
router.get("/all", showAllClinics);
router.get("/:id", findOneClinic);
router.get("/searchByOwner/:id", searchByOwner);

export default router;
