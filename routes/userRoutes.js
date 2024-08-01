import express from 'express';
import { updateProfile,getProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', (req, res) => res.send('User route is working'));

router.patch('/profile', authMiddleware, updateProfile);
router.get('/profile', authMiddleware, getProfile);

export default router;
