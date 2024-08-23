// import express from 'express';
// import connectDB from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
// import cors from 'cors';
// import userRoutes from './routes/userRoutes.js';
// import referralRoutes from './routes/referralRoutes.js';
// import notificationRoutes from './routes/notificationRoutes.js';
// import dotenv from 'dotenv';


// dotenv.config();

// const app = express();


// connectDB();


// app.use(express.json());
// app.use(cors()); 


// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/referral', referralRoutes); 
// app.use('/api/notifications', notificationRoutes);

// const PORT = process.env.PORT || 5000;


// app.get('/api', (req, res) => res.send('API route is working'));
// app.get('/', (req, res) => res.send('Main route is working'));

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));





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

// CORS Configuration
const corsOptions = {
  origin: 'https://refermeplatform.vercel.app', // Allow only your Vercel-hosted frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Allow specific HTTP methods
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // Enable CORS with specified options

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
