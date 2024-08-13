import express from "express";
import {
  register,
  verifyUserOTP,
  login,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/", (req, res) => res.send("Auth route is working"));
router.post("/register", register);
router.post("/verify-otp", verifyUserOTP);
router.post("/login", login);

export default router;
