import express from "express";
import {
  showAllTreatments,
  findOneTreatment,
  searchByClinic,
  newTreatment,
  deleteTreatment,
  editTreatment,
} from "../controllers/treatmentController.js";

const router = express.Router();

// 检查登录状态接口
router.get("/all", showAllTreatments);
router.get("/:id", findOneTreatment);
router.get("/treatmentByClinic/:id", searchByClinic);
router.post("/new-treatment/:clinicId", newTreatment);
router.post("/edit-treatment/:id", editTreatment);
router.delete("/delete/:id", deleteTreatment);

export default router;
