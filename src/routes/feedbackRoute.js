import express from "express";
import {
  getLikesRestaurant,
  getLikesUser,
  getRatingRes,
  getRatingUser,
  likeRes,
  ratingRes,
} from "../controllers/feedbackController.js";

const feedbackRoute = express.Router();

// api like
feedbackRoute.get("/get-likes-restaurant/:resId", getLikesRestaurant);
feedbackRoute.get("/get-likes-user/:userId", getLikesUser);
feedbackRoute.post("/like", likeRes);

feedbackRoute.get("/get-rates-user/:userId", getRatingUser);
feedbackRoute.get("/get-rates-restaurant/:resId", getRatingRes);
feedbackRoute.get("/rating", ratingRes);

export default feedbackRoute;
