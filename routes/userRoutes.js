import express from "express";
import {
  registerUser,
  loginUser,
  checkLogin,
  logout,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("respond with a resource");
  next();
});

router.get("/check-login", checkLogin);

router.post("/logout", logout);

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);

export default router;
