import mongoose from "mongoose";
import 'dotenv/config'

const databaseConnection = process.env.DATABASE_URL

mongoose
    .connect(databaseConnection)
    .then(() => {
        console.log("MongoDB database connected successfully");
    })
    .catch((error) => {
        console.error("Error connecting to the database");
        console.error(error);
    });
