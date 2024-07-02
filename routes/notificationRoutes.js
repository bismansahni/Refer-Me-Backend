import express from 'express';
import { getUserNotifications } from '../controllers/notificationcontroller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Test route to check if notification route is working
router.get('/test', (req, res) => res.send('Notification route is working'));

// Route to get user notifications
router.get('/', authMiddleware, getUserNotifications);

export default router;