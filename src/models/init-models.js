import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _food_types from  "./food_types.js";
import _foods from  "./foods.js";
import _like_res from  "./like_res.js";
import _orders_food from  "./orders_food.js";
import _rate_res from  "./rate_res.js";
import _restaurants from  "./restaurants.js";
import _sub_food from  "./sub_food.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const food_types = _food_types.init(sequelize, DataTypes);
  const foods = _foods.init(sequelize, DataTypes);
  const like_res = _like_res.init(sequelize, DataTypes);
  const orders_food = _orders_food.init(sequelize, DataTypes);
  const rate_res = _rate_res.init(sequelize, DataTypes);
  const restaurants = _restaurants.init(sequelize, DataTypes);
  const sub_food = _sub_food.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  foods.belongsTo(food_types, { as: "type", foreignKey: "type_id"});
  food_types.hasMany(foods, { as: "foods", foreignKey: "type_id"});
  orders_food.belongsTo(foods, { as: "food", foreignKey: "food_id"});
  foods.hasMany(orders_food, { as: "orders_foods", foreignKey: "food_id"});
  sub_food.belongsTo(foods, { as: "food", foreignKey: "food_id"});
  foods.hasMany(sub_food, { as: "sub_foods", foreignKey: "food_id"});
  like_res.belongsTo(restaurants, { as: "re", foreignKey: "res_id"});
  restaurants.hasMany(like_res, { as: "like_res", foreignKey: "res_id"});
  rate_res.belongsTo(restaurants, { as: "re", foreignKey: "res_id"});
  restaurants.hasMany(rate_res, { as: "rate_res", foreignKey: "res_id"});
  like_res.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(like_res, { as: "like_res", foreignKey: "user_id"});
  orders_food.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders_food, { as: "orders_foods", foreignKey: "user_id"});
  rate_res.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(rate_res, { as: "rate_res", foreignKey: "user_id"});

  return {
    food_types,
    foods,
    like_res,
    orders_food,
    rate_res,
    restaurants,
    sub_food,
    users,
  };
}
