import { OK } from "../constants/codes.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import path from "path";
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

export const generatePassword = (length = 8) => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  const allChars = upper + lower + numbers;
  let password = "";

  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];

  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
};

export const sendMail = async (to, subject, template_name, jsonData) => {
  try {
    const USER = process.env.EMAIL_SERVICE_USER;
    const PASS = process.env.EMAIL_SERVICE_PASS;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: USER, pass: PASS },
    });

    let html = readFileSync(
      path.join(process.cwd(), "templates", template_name),
      "utf-8"
    );
    Object.keys(jsonData || {}).forEach(
      (key) => (html = html.replace(key, jsonData[key]))
    );

    const mailOptions = { from: USER, to, subject, html };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
};

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.split(" ").join("-"));
  },
});
export const uploadFileInstance = multer({ storage: storage });
