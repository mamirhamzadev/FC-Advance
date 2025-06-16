import { BAD_REQUEST, CREATED, OK, SERVER_ERROR } from "../constants/codes.js";
import Admin from "../models/Admin.js";
import Application from "../models/Application.js";
import {
  makeRes,
  createHash,
  compHash,
  createToken,
} from "../helpers/utils.js";
import fs from "fs";
import path from "path";

export const update = async (req, res) => {
  const payload = req.body;

  if (!payload?.name) return makeRes(res, "Name is empty", BAD_REQUEST);
  if (!payload?.username) return makeRes(res, "Username is empty", BAD_REQUEST);
  if (!payload?.email) return makeRes(res, "Email is empty", BAD_REQUEST);
  if (!payload?._id)
    return makeRes(
      res,
      "Something went wrong. Please refresh and try again",
      BAD_REQUEST
    );

  try {
    let user = await Admin.findOne({ _id: payload._id });

    let emailUser, usernameUser;
    if (user.email !== payload?.email)
      emailUser = await Admin.findOne({
        email: payload?.email,
      });
    if (user.username !== payload?.username)
      usernameUser = await Admin.findOne({
        username: payload?.username,
      });
    if (emailUser || usernameUser)
      return makeRes(res, "User already exists", CREATED, {
        email: !!emailUser,
        username: !!usernameUser,
      });

    if (
      user.profileImage !== payload?.profileImage ||
      req?.file?.path !== user.profileImage
    ) {
      try {
        fs.unlinkSync(path.join(process.cwd(), user.profileImage));
      } catch (e) {}
    }
    user.name = payload?.name;
    user.username = payload?.username;
    user.email = payload?.email;
    user.profileImage = req?.file?.path || payload?.profileImage;
    await user.save();
    return makeRes(res, "Admin updated successfully", OK, {
      profile: req.user,
    });
  } catch (e) {
    return makeRes(
      res,
      "Something went wrong, please refresh and try again",
      SERVER_ERROR
    );
  }
};

export const login = async (req, res) => {
  const payload = req.body;

  const error_fields = [];
  if (!payload?.email) error_fields.push("Email");
  if (!payload?.password) error_fields.push("Password");

  if (error_fields.length)
    return makeRes(res, "Empty Fields", BAD_REQUEST, {
      empty_fields: error_fields,
    });

  try {
    const user = await Admin.findOne({
      email: payload.email,
    });
    if (user && compHash(user.password, payload.password)) {
      const token = createToken({ _id: user._id, email: user.email });
      return makeRes(res, "User loged in successfully", OK, {
        token,
        profile: { ...user._doc, password: "" },
      });
    }
    return makeRes(res, "Credentials not matched", BAD_REQUEST);
  } catch (e) {
    return makeRes(
      res,
      "Something went wrong, please refresh and try again",
      SERVER_ERROR
    );
  }
};

export const profile = (req, res) => {
  return makeRes(res, "", OK, { profile: req.user });
};

export const changePassword = async (req, res) => {
  const user_id = req.user._id;
  let payload = req.body;

  if (!payload?.oldPassword)
    return makeRes(res, "Old Password is empty", BAD_REQUEST);
  if (!payload?.newPassword)
    return makeRes(res, "New Password is empty", BAD_REQUEST);
  if (!payload?.confirmPassword)
    return makeRes(res, "Confirm Password is empty", BAD_REQUEST);

  if (payload?.newPassword !== payload?.confirmPassword)
    return makeRes(
      res,
      "New password not matched with confirm password",
      BAD_REQUEST
    );

  try {
    let user = await Admin.findOne({ _id: user_id });
    if (compHash(user.password, payload.oldPassword)) {
      user.password = createHash(payload.newPassword);
      await user.save();
      return makeRes(res, "Password updated", OK, { profile: req.user });
    }
    return makeRes(res, "Old Password is incorrect", BAD_REQUEST);
  } catch (e) {
    console.log(e);
    return makeRes(
      res,
      "Something went wrong. Please refresh and try again",
      SERVER_ERROR
    );
  }
};

export const listUsers = async (req, res) => {};

export const dashboard = async (req, res) => {
  try {
    const applications = await Application.countDocuments({});
    return makeRes(res, "", OK, { profile: req.user, applications });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};
