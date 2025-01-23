import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";





const app = express();


// Middleware setup

app.use(cors({
  origin: [
    process.env.CORS_ORIGIN, // Your local development 
    'crm-project-topaz.vercel.app', 
    // 'https://crm-project-topaz.vercel.app',

    'https://crm-project-ic35.vercel.app',
      /// Your Vercel deployment 
 'http://localhost:5173',

    'http://localhost:5174'
     // Your local development client
  ],
  credentials: true // Important for handling cookies across origins
}))


app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
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
app.use("/api/v1", productRouter); 
// app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/categry", categrayRouter);
app.use("/api/v1/users", cartRouter);
app.use("/api/v1/sipping", sippingRouter)


// http://localhost:3000/api/v1/users/register


// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

export { app };

