import express from 'express';
import { requestReferral } from '../controllers/referralController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to request a referral
router.post('/', authMiddleware, requestReferral);

// Test route to check if referral route is working
router.get('/test', (req, res) => res.send('Referral route is working'));

export default router;
