import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
import shortUrl from "./routes/shortUrl";
dotenv.config();
connectDb();


const rateLimit = require('express-rate-limit');
const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true,
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  });
  
  // Apply the rate limiter to all requests
  app.use(limiter);




app.use("/api/", shortUrl);







app.listen(port, ()=>{
 console.log(`Server started successfully on port: ${port}`);
});