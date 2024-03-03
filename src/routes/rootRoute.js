import express from "express";
import feedbackRoute from "./feedbackRoute.js";
import orderRoute from "./orderRoute.js";

const rootRoute = express.Router();
rootRoute.use("/feedback", feedbackRoute);
rootRoute.use("/order", orderRoute);

export default rootRoute;
