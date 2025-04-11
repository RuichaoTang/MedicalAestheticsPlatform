import express from "express";
import {
  showAllTreatments,
  findOneTreatment,
  searchByClinic,
  newTreatment,
  deleteTreatment,
  editTreatment,
  searchTreatments,
} from "../controllers/treatmentController.js";

const router = express.Router();

router.get("/all", showAllTreatments);
router.get("/search", searchTreatments);
router.get("/:id", findOneTreatment);
router.get("/treatmentByClinic/:id", searchByClinic);
router.post("/new-treatment/:clinicId", newTreatment);
router.post("/edit-treatment/:id", editTreatment);
router.delete("/delete/:id", deleteTreatment);

export default router;
