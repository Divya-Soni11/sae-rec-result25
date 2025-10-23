import express from 'express';
import mongoose from 'mongoose';
import candidateRoutes from './routes/resultRoutes.js';
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
app.use(bodyParser.json());
const PORT=process.env.PORT;
const mongoUri=process.env.MONGOURI;

// Connect to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));


//cors
const allowedOrigins=['http://127.0.0.1:5500','https://localhost:3000','https://localhost:5000','https://localhost:8000'];

app.use(cors({
    origin:function (origin,callback){
        if (!origin || allowedOrigins.includes(origin)){
            callback (null,true);
        }
        else{
            callback(new Error('Not allowed by CORS.'));
        }
    }
}));
// API routes
app.use('/api/sae', candidateRoutes);

// Default route for server health check
app.get('/', (req, res) => {
  res.send('Recruitment backend is running');
});

// Define PORT and start server
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});