import cors from 'cors'; // Import cors package

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import pricingRoute from './routes/pricingPlan.js'

import cookieParser from "cookie-parser";
const app = express();
dotenv.config()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  }));

const port = process.env.PORT || 8800;

const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to Mongodb")
    } catch (error) {
        throw error
    }
};

mongoose.connection.on("disconnected", () => {
    console.log('Mongoose connection disconnected!');
})





app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/price", pricingRoute);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something Went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
    // res.send("Hi I am a Middleware")
    // next()
})






app.listen(port, () => {
    connect()
    console.log(`Server is running at port ${port}`)
});

