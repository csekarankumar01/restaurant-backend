import mongoose from "mongoose";

const dbConnection = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "RESTAURANT",
        })
        .then(() => {
            console.log("Connected to database successfully!");
        })
        .catch((err) => {
            console.log(`Some error occurred while connecting to database! ${err}`);
        });
};

export default dbConnection; 