import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRoute from "./routes/reservationRoute.js";

// 1. Load environment variables FIRST so process.env values exist for everything below
dotenv.config({ path: "./config/config.env" });

const app = express();

// 2. Setup CORS allowing your production Vercel frontend link explicitly
app.use(
    cors({
        origin: [
            process.env.FRONTEND_URL, 
            "https://restaurant-frontend-six-livid.vercel.app", // Your live Vercel deployment link
            "http://localhost:5173",                            // Standard local Vite development fallback
            "http://localhost:5174"
        ], 
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

// Handle browser preflight OPTIONS handshake checks dynamically
app.options("*", cors());

// 3. Express built-in body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// 4. Establish Database Connection
dbConnection(); 

// 5. Mount API routes
app.use("/api/v1/reservation", reservationRoute);

// 6. Global error handling middleware
app.use(errorMiddleware);

export default app;