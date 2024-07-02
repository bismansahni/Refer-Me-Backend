import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import referralRoutes from './routes/referralRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/referral', referralRoutes); 
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;

// Test Routes
app.get('/api', (req, res) => res.send('API route is working'));
app.get('/', (req, res) => res.send('Main route is working'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
