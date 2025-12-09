import express from 'express';
import cors from 'cors';
import audioRoutes from './routes/audio.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/',audioRoutes);


export default app;