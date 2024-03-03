import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import users from "../models/users.js";
import { responseApi } from "../config/response.js";

const model = initModels(sequelize);

let getLikesUser = async (req, res) => {
  let { userId } = req.params;
  let data = await model.like_res.findAll({
    where: {
      user_id: userId,
    },
  });
  if (data && data.length) {
    responseApi(res, 200, data, "Successfully");
  } else {
    responseApi(res, 400, data, "No Result");
  }
};

let getLikesRestaurant = async (req, res) => {
  let { resId } = req.params;
  let data = await model.like_res.findAll({
    where: {
      res_id: resId,
    },
  });
  if (data && data.length) {
    responseApi(res, 200, data, "Successfully");
  } else {
    responseApi(res, 400, data, "No result");
  }
};

let likeRes = async (req, res) => {
  const { isLiked, userId, resId } = req.body;

  let checkLike = await model.like_res.findOne({
    where: {
      user_id: userId,
      res_id: resId,
    },
  });

  if (checkLike) {
    checkLike.dataValues.is_liked = isLiked ? 1 : 0;
    await model.like_res.update(checkLike.dataValues, {
      where: {
        user_id: userId,
        res_id: resId,
      },
    });
  } else {
    let newLike = {
      user_id: userId,
      res_id: resId,
      date_like: new Date(),
      is_liked: 1,
    };
    await model.like_res.create(newLike);
  }
  responseApi(res, 200, "", "Successfully");
};

let getRatingUser = async (req, res) => {
  let { userId } = req.params;

  let data = await model.rate_res.findAll({
    where: {
      user_id: userId,
    },
  });

  if (data && data.length) {
    responseApi(res, 200, data, "Successfully");
  } else {
    responseApi(res, 400, "No data");
  }
};

let getRatingRes = async (req, res) => {
  let { resId } = req.params;

  let data = await model.rate_res.findAll({
    where: {
      res_id: resId,
    },
  });

  if (data && data.length) {
    responseApi(res, 200, data, "Successfully");
  } else {
    responseApi(res, 400, "", "No data");
  }
};

let ratingRes = async (req, res) => {
  let { userId, resId, amount } = req.body;

  let checkRating = await model.rate_res.findOne({
    where: {
      user_id: userId,
      res_id: resId,
    },
  });

  if (checkRating) {
    checkRating.dataValues.amount = amount;
    await model.rate_res.update(checkRating.dataValues, {
      where: {
        user_id: userId,
        res_id: resId,
      },
    });
  } else {
    let newRating = {
      user_id: userId,
      res_id: resId,
      date_rate: new Date(),
      amount: amount,
    };
    await model.rate_res.create(newRating);
  }

  responseApi(res, 200, "", "Successfully");
};

export {
  likeRes,
  getLikesUser,
  getLikesRestaurant,
  getRatingUser,
  getRatingRes,
  ratingRes,
};
