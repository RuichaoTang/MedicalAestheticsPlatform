import express from "express";
import {
  showAllClinics,
  findOneClinic,
  searchByOwner,
  newClinic,
  editClinic,
  deleteClinic,
  searchClinics,
} from "../controllers/clinicController.js";

const router = express.Router();

router.get("/all", showAllClinics);
router.get("/search", searchClinics);
router.get("/:id", findOneClinic);
router.get("/clinicsByUser/:id", searchByOwner);
router.post("/new-clinic", newClinic);
router.post("/edit-clinic/:id", editClinic);
router.delete("/delete/:id", deleteClinic);

export default router;
