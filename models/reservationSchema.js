import mongoose from "mongoose";

import validator from "validator";

const reservationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must contain at least 3 characters"],
        maxlength: [30, "First name cannot exceed 30 characters"],
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, "Last name must contain at least 3 characters"],
        maxlength: [30, "Last name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
        },
    phone: {
        type: String,
        required: true,
        minlength: [10, "Phone number must contain at least 10 digits"],
        maxlength: [10, "Phone number cannot exceed 15 digits"],
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);