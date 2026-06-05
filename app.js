import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// 1. CRITICAL ENGINE FIX: Load environment variables BEFORE importing internal files like dbConnection
dotenv.config({ path: "./config/config.env" });

// 2. Now import your custom modules safely (they can read process.env now!)
import dbConnection from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRoute from "./routes/reservationRoute.js";

const app = express();

// 3. Setup CORS allowing your production Vercel frontend link explicitly
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

// FIX: Swapped out the literal "*" string with a safe regular expression pattern for wildcards
app.options(/(.*)/, cors());

// 4. Express built-in body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// 5. Establish Database Connection
dbConnection(); 

// 6. Mount API routes
app.use("/api/v1/reservation", reservationRoute);

// 7. Global error handling middleware
app.use(errorMiddleware);

export default app;