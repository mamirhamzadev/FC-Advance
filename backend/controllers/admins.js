import {
  BAD_REQUEST,
  CREATED,
  NOT_FOUND,
  OK,
  SERVER_ERROR,
} from "../constants/codes.js";
import Admin from "../models/Admin.js";
import Application from "../models/Application.js";
import {
  makeRes,
  createHash,
  compHash,
  createToken,
  sendMail,
  generatePassword,
} from "../helpers/utils.js";
import fs from "fs";
import path from "path";
import Reps from "../models/Reps.js";

const EXPIRATION_TIME_FOR_OTP = 10; // in minutes.

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
      const adminRep = await Reps.findOne({ admin_id: user._id });
      if (!adminRep) {
        await Reps.create({
          name: user.name,
          email: user.email,
          password: payload.password,
          admin_id: user._id,
        });
      }
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

export const sendOtp = async (req, res) => {
  let payload = req.body;
  if (!payload?.email) return makeRes(res, "Email is empty", BAD_REQUEST);

  try {
    let user = await Admin.findOne({ email: payload?.email });
    if (!user) return makeRes(res, "User not found with this email", NOT_FOUND);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiration = Date.now();
    await user.save();
    if (
      await sendMail(
        user.email,
        "OTP for reset password",
        "otp-template.html",
        {
          "{{name}}": user.name,
          "{{otp}}": otp,
          "{{expiration_time}}": EXPIRATION_TIME_FOR_OTP,
        }
      )
    )
      return makeRes(
        res,
        `Otp sent on the given email and is valid for ${EXPIRATION_TIME_FOR_OTP} minutes`,
        OK
      );
    return makeRes(res, `Otp cannot be sent. Please refresh and try again`, OK);
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const verifyOTP = async (req, res) => {
  let payload = req.body;
  if (!payload?.email) return makeRes(res, "Email is empty", BAD_REQUEST);
  if (!payload?.otp) return makeRes(res, "OTP field is empty", BAD_REQUEST);

  try {
    let user = await Admin.findOne({ email: payload?.email });
    if (!user)
      return makeRes(
        res,
        "User not found. Please refresh and try again",
        NOT_FOUND
      );

    if (user.otp !== payload?.otp)
      return makeRes(res, "OTP not matched", BAD_REQUEST);
    if (
      Date.now() >
      new Date(user.otpExpiration).getTime() +
        EXPIRATION_TIME_FOR_OTP * 60 * 1000
    )
      return makeRes(res, "OTP is expired", BAD_REQUEST);

    user.otp = "";
    user.otpExpiration = null;
    const password = generatePassword(10);
    user.password = createHash(password);
    await user.save();

    if (
      await sendMail(user.email, "Password Reset", "new-password.html", {
        "{{name}}": user.name,
        "{{password}}": password,
        "{{admin_panel_url}}": `${process.env.ADMIN_BASE_URL}/auth`,
      })
    )
      return makeRes(
        res,
        "New password sent to your email. Login to access admin panel",
        OK
      );
    return makeRes(
      res,
      "Something went wrong. Please refresh and try again",
      BAD_REQUEST
    );
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
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
    const reps = await Reps.countDocuments({ admin_id: null });
    const applications = await Application.countDocuments({});
    return makeRes(res, "", OK, { profile: req.user, applications, reps });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};
