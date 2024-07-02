import express from 'express';
import { updateProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', (req, res) => res.send('User route is working'));

router.patch('/profile', authMiddleware, updateProfile);

export default router;
