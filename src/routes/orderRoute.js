import express from "express";
import { createOrder } from "../controllers/orderController.js";

const orderRoute = express.Router();

export default orderRoute;

orderRoute.use("/create-order", createOrder);
