import express from 'express';
import mongoose from 'mongoose';
import candidateRoutes from './routes/resultRoutes.js';
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
app.use(bodyParser.json());

// Fix 1: Use correct environment variable names
const PORT = process.env.PORT || 8000;
const mongoUri = process.env.MONGODB_URI || process.env.MONGOURI;

// Fix 2: Check if MongoDB URI exists
if (!mongoUri) {
  console.error('MongoDB connection string is missing!');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Fix 3: Update CORS to allow all origins in production
const allowedOrigins=[
  'http://127.0.0.1:5500',
  'https://localhost:3000', 
  'https://localhost:5000',
  'https://localhost:8000',
  'https://sae-rec-result25.netlify.app',
  'https://results.saeuietpu.in'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // In production, you might want to be more restrictive
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// API routes
app.use('/api/sae', candidateRoutes);

// Default route for server health check
app.get('/', (req, res) => {
  res.send('Recruitment backend is running');
});

// Request logging middleware should come before routes
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Define PORT and start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});