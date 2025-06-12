import { OK } from "../constants/codes.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
dotenv.config();

export const makeRes = (res, msg = "", code = OK, data = null) => {
  if (res.headerSent) return;
  res.status(code).json({ code, msg, data });
};

export const normalizeProfile = (userObj) => {
  if (!userObj) return null;
  let obj = {
    _id: userObj?._id,
    email: userObj?.email,
  };
  if (userObj?.wishlist) obj["wishlist"] = (userObj?.wishlist || []).length;
  if (userObj?.orders) obj["orders"] = (userObj?.orders || []).length;
  if (userObj?.first_name) {
    obj[`first_name`] = userObj?.first_name;
    obj[`last_name`] = userObj?.last_name;
  } else {
    obj[`name`] = userObj?.name;
    obj[`username`] = userObj?.username;
    obj[`profileImage`] = userObj?.profileImage;
  }
  return obj;
};

export const createHash = (data) => {
  return bcrypt.hashSync(data, bcrypt.genSaltSync());
};

export const compHash = (hash, data) => {
  return bcrypt.compareSync(data, hash);
};

export const createToken = (data) => {
  return jwt.sign(data, process.env.APP_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
};

export const getTokenPayload = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.APP_SECRET, (err, payload) => {
      if (err) return reject(null);
      resolve(payload);
    });
  });
};

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.split(" ").join("-"));
  },
});
export const uploadFileInstance = multer({ storage: storage });
