import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, time, date } = req.body;
    
    if(!firstName || !lastName || !email || !phone || !time || !date) {
        return next(new ErrorHandler("Please fill in all fields", 400));
    }
    
    try {
        // Pass fields inside a single object payload
        await Reservation.create({ firstName, lastName, email, phone, time, date });
        
        // Corrected res.status().json() syntax
        res.status(200).json({
            success: true,
            message: "Reservation sent successfully",
        });
    } catch (error) {
        if(error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return next(new ErrorHandler(validationErrors.join(", "), 400));
        }
        // Always forward unknown errors to avoid hanging requests
        return next(error); 
    }
};