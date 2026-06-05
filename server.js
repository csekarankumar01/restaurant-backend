import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Initialize environment configuration variables
dotenv.config({ path: "./config/config.env" });

const app = express();

// ====================================================================
// CRITICAL FIX: PRODUCTION CORS FIREWALL CONFIGURATION
// ====================================================================
app.use(
  cors({
    origin: [
      "https://restaurant-frontend-six-livid.vercel.app", // Your live production Vercel frontend URL
      "http://localhost:5173"                             // Local development Vite server fallback
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Intercept and cleanly acknowledge browser preflight OPTIONS requests 
app.options("*", cors());

// Standard Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====================================================================
// DATABASE CONNECTION MECHANISM
// ====================================================================
const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "RESTAURANT_RESERVATION",
    })
    .then(() => {
      console.log("Connected to MongoDB Atlas cluster database successfully!");
    })
    .catch((err) => {
      console.log(`Database connection error cluster failure: ${err}`);
    });
};
dbConnection();

// ====================================================================
// DATABASE SCHEMAS & MODELS
// ====================================================================
const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is mandatory."],
  },
  lastName: {
    type: String,
    required: [true, "Last name is mandatory."],
  },
  email: {
    type: String,
    required: [true, "Email address is mandatory."],
  },
  phone: {
    type: String,
    required: [true, "Phone number is mandatory."],
  },
  date: {
    type: String,
    required: [true, "Reservation date is mandatory."],
  },
  time: {
    type: String,
    required: [true, "Reservation time slice slot is mandatory."],
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

// ====================================================================
// API ROUTING LAYERS
// ====================================================================
app.post("/api/v1/reservation", async (req, res, next) => {
  const { firstName, lastName, email, phone, date, time } = req.body;

  if (!firstName || !lastName || !email || !phone || !date || !time) {
    return res.status(400).json({
      success: false,
      message: "Please complete all fields in the reservation form.",
    });
  }

  try {
    await Reservation.create({ firstName, lastName, email, phone, date, time });
    return res.status(201).json({
      success: true,
      message: "Reservation submitted successfully! Your table has been booked.",
    });
  } catch (error) {
    return next(error);
  }
});

// Health check diagnostic landing route endpoint
app.get("/", (res) => {
  res.status(200).json({
    success: true,
    message: "Restaurant booking MERN API engine is alive and operational.",
  });
});

// ====================================================================
// GLOBAL ERROR HANDLING MIDDLEWARE
// ====================================================================
app.use((err, req, res, next) => {
  err.message = err.message || "Internal Server Error Runtime Fault.";
  err.statusCode = err.statusCode || 500;

  // Handle Mongoose Validation Errors
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message).join(" ");
    return res.status(400).json({ success: false, message });
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
});

// ====================================================================
// SERVER START ACTIVATION
// ====================================================================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server executing active network port processing layer on port: ${PORT}`);
});