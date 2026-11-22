import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import {
  connectDB,
} from "./config/db.js";

import userRouter from "./routes/userRoutes.js";
import complaintRouter from "./routes/complaintRoutes.js";


dotenv.config();


const app =
  express();


const PORT =
  process.env.PORT || 4000;


// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin:
      "http://localhost:5173",

    credentials:
      true,
  })
);


// ==========================================
// BODY PARSER
// ==========================================

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ==========================================
// COOKIE PARSER
// ==========================================

app.use(
  cookieParser()
);


// ==========================================
// UPLOADS
// ==========================================

app.use(
  "/uploads",
  express.static("uploads")
);


// ==========================================
// TEST ROUTE
// ==========================================

app.get(
  "/",
  (req, res) => {
    res.send(
      "Smart City Complaint Management System API is running!"
    );
  }
);


// ==========================================
// AUTH ROUTES
// ==========================================

app.use(
  "/api/auth",
  userRouter
);


// ==========================================
// COMPLAINT ROUTES
// ==========================================

app.use(
  "/api/complaint",
  complaintRouter
);


// ==========================================
// DATABASE
// ==========================================

await connectDB();


// ==========================================
// SERVER
// ==========================================

app.listen(
  PORT,
  () => {
    console.log(
      `Server is running on PORT: ${PORT}`
    );
  }
);