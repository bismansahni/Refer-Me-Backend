import express from "express";
import { getUserNotifications } from "../controllers/notificationcontroller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/test", (req, res) => res.send("Notification route is working"));

router.get("/", authMiddleware, getUserNotifications);

export default router;
