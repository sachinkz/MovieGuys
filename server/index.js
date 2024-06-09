import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from "helmet";

// routes importing
import userRoutes from "./routes/userRoutes.js"
import authRoutes from './routes/authRoutes.js'

const app = express();
dotenv.config()

//app security middlewares
app.use(cors({ origin:true}));
app.use(helmet());

// bodyParsers to parse body from request object
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// custom routes 
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// mongodb connection and app listening
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.74thgvu.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server listening on port " + process.env.PORT)
    })
}).catch(() => console.log("Database connection Error!!"));