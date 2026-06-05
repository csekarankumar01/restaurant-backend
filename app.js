import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRoute from "./routes/reservationRoute.js";

const app = express();

// 1. Load environment variables
dotenv.config({ path: "./config/config.env" });

// 2. Setup CORS with a fallback to prevent crashes if ENV is missing
app.use(
    cors({
        origin: [process.env.FRONTEND_URL || "http://localhost:5174"], 
        methods: ["POST", "GET", "PUT", "DELETE"], // Added commonly needed methods
        credentials: true,
    })
);

// 3. Express built-in body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// 4. Establish Database Connection BEFORE routes
dbConnection(); 

// 5. Mount API routes
app.use("/api/v1/reservation", reservationRoute);

// 6. Global error handling middleware
app.use(errorMiddleware);

export default app;