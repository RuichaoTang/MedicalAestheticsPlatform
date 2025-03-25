import express from "express";
import {
  showAllClinics,
  findOneClinic,
  searchByOwner,
  newClinic,
  editClinic,
  deleteClinic,
} from "../controllers/clinicController.js";

const router = express.Router();

// 检查登录状态接口
router.get("/all", showAllClinics);
router.get("/:id", findOneClinic);
router.get("/clinicsByUser/:id", searchByOwner);
router.post("/new-clinic", newClinic);
router.post("/edit-clinic/:id", editClinic);
router.delete("/delete/:id", deleteClinic);

export default router;
