import express, { Express } from "express";
import cors from "cors";
import audioRoutes from "./routes/transcription.routes.js";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/transcriptions", audioRoutes);

export default app;
