import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware setup
app.use(cors({
  origin: process.env.CORS_ORIGIN,

}))
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Import routes
import userRouter from "./routers/user.routes.js";
import productRouter from './routers/product.routes.js'
import orderRouter from './routers/order.routes.js'
import categrayRouter from './routers/categray.routes.js'

import cartRouter from '../src/routers/cat.routes.js'
import  sippingRouter from './routers/sipping.routes.js'


// Route setup    Users API
app.use("/api/v1/users", userRouter); 
app.use("/api/v1/users", productRouter);
app.use("/api/v1/users", orderRouter);
app.use("/api/v1/user", categrayRouter);
app.use("/api/v1/users", cartRouter);
app.use("/api/v1/users", sippingRouter)



// http://localhost:3000/api/v1/users/register

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

export { app };
