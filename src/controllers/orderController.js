import express from "express";
import sequelize from "../models/connect.js";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";

import initModels from "../models/init-models.js";
import { responseApi } from "../config/response.js";

const model = initModels(sequelize);

let createOrder = async (req, res) => {
  let { userId, foodId, subFoodId } = req.body;

  let checkFood = await model.foods.findOne({
    where: {
      food_id: foodId,
    },
  });

  let priceSubFood = await model.sub_food.sum("sub_price", {
    where: {
      food_id: { [Op.in]: subFoodId },
    },
  });

  console.log("priceSubFood", priceSubFood);
  let newOrder = {
    user_id: userId,
    food_id: foodId,
    code: new Date().getTime(),
    amount: checkFood.dataValues.price + priceSubFood,
    array_sub_id: subFoodId.join(","),
  };
  await model.orders_food.create(newOrder);
  responseApi(res, 200, "", "Successfully");
};

export { createOrder };
