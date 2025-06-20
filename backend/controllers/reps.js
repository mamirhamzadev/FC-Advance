import {
  BAD_REQUEST,
  NOT_FOUND,
  OK,
  SERVER_ERROR,
  UNAUTHORIZED,
} from "../constants/codes.js";
import {
  createToken,
  generatePassword,
  makeRes,
  sendMail,
} from "../helpers/utils.js";
import Application from "../models/Application.js";
import Reps from "../models/Reps.js";
import dotenv from "dotenv";
import { isObjectIdOrHexString } from "mongoose";
import { unlinkSync } from "fs";
import { join } from "path";
dotenv.config();

export const create = async (req, res) => {
  const payload = req.body;

  const empty_fields = [];
  if (!payload?.name) empty_fields.push("Name");
  if (!payload?.email) empty_fields.push("Email");

  if (empty_fields.length)
    return makeRes(
      res,
      `${empty_fields.join(", ")} ${
        empty_fields.length > 1 ? "are" : "is"
      } required`,
      BAD_REQUEST
    );

  try {
    const existingRep = await Reps.findOne({ email: payload?.email });
    if (existingRep)
      return makeRes(res, "Another rep exists with this email", BAD_REQUEST);
    payload.password = generatePassword();
    const rep = await Reps.create(payload);
    let msg = "Rep created and email cannot be sent at " + rep.email;
    if (
      await sendMail(
        rep.email,
        `Credentials for Rep (${rep?.name})`,
        "rep-credentials.html",
        {
          "{{name}}": rep.name,
          "{{email}}": rep.email,
          "{{password}}": rep.password,
          "{{url}}": `${process.env.CLIENT_BASE_URL}/rep/dashboard`,
        }
      )
    )
      msg = "Rep created and email sent at " + rep.email;
    return makeRes(res, msg, OK, { profile: req.user });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const update = async (req, res) => {
  const payload = req.body;

  const empty_fields = [];
  if (!payload?._id)
    return makeRes(
      res,
      "Something went wrong. Please refresh and try again",
      BAD_REQUEST
    );
  if (!payload?.name) empty_fields.push("Name");
  if (!payload?.email) empty_fields.push("Email");

  if (empty_fields.length)
    return makeRes(
      res,
      `${empty_fields.join(", ")} ${
        empty_fields.length > 1 ? "are" : "is"
      } required`,
      BAD_REQUEST
    );

  try {
    const existingRep = await Reps.findOne({ email: payload?.email });
    if (existingRep)
      return makeRes(res, "Another rep exists with this email", BAD_REQUEST);
    let rep = await Reps.findOne({ _id: payload?._id });
    rep.name = payload?.name;
    let mailChanged = false;
    if (rep.email !== payload?.email) {
      rep.email = payload?.email;
      mailChanged = true;
    }
    rep = await rep.save();
    let msg = "Rep updated";
    if (mailChanged) {
      if (
        await sendMail(
          rep.email,
          `Credentials for Rep (${rep.name})`,
          "rep-credentials.html",
          {
            "{{name}}": rep.name,
            "{{email}}": rep.email,
            "{{password}}": rep.password,
            "{{url}}": `${process.env.CLIENT_BASE_URL}/rep/dashboard`,
          }
        )
      )
        msg = "Rep updated and email sent at " + rep.email;
      else msg = "Rep updated and email cannot be sent at " + rep.email;
    }
    return makeRes(res, msg, OK, { profile: req.user });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const remove = async (req, res) => {
  const id = req.params.id;
  if (!id)
    return makeRes(
      res,
      "Something went wrong. Please refresh and try again",
      BAD_REQUEST
    );
  try {
    const repApplications = (
      await Reps.findOne({ _id: id }).populate("applications")
    ).applications;
    const mediaFiles = repApplications
      .map((app) => app?.media)
      .flat()
      .filter((file) => !!file)
      .map((file) => file.split("\\").pop());
    mediaFiles.forEach((file) => {
      try {
        unlinkSync(join(process.cwd(), "uploads", file));
      } catch (e) {}
    });

    const response = await Reps.deleteOne({ _id: id });
    const applicationsResponse = await Application.deleteMany({
      _id: repApplications.map((app) => app._id),
    });
    let msg = "Rep and related applications deleted";
    if (response.deletedCount)
      msg = !applicationsResponse.deletedCount
        ? "Rep deleted but applications not deleted"
        : msg;
    else msg = "Rep cannot be deleted";
    return makeRes(res, msg, OK, { profile: req.user });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const getRepForRepDashboard = async (req, res) => {
  const email = req?.rep?.email;
  if (!email)
    return makeRes(
      res,
      "Something went wrong. Please refresh and try again",
      BAD_REQUEST
    );
  try {
    const rep = await Reps.findOne({ email, admin_id: null })
      .populate("applications")
      .lean();
    return makeRes(res, "", OK, { rep, profile: req.user });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const get = async (req, res) => {
  const id = req.params.id;
  if (!id)
    return makeRes(
      res,
      "Something went wrong. Please refresh and try again",
      BAD_REQUEST
    );
  try {
    const rep = await Reps.findOne({ _id: id }).populate("applications").lean();
    return makeRes(res, "", OK, { rep, profile: req.user });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const list = async (req, res) => {
  try {
    let reps = await Reps.find({ admin_id: null }).lean();
    let admin_rep = await Reps.findOne({ admin_id: req.user?._id }).lean();
    reps = reps.map((rep) => ({
      ...rep,
      link: `${process.env.CLIENT_BASE_URL}/apply/${rep._id}`,
    }));
    admin_rep = {
      ...admin_rep,
      link: `${process.env.CLIENT_BASE_URL}/apply/${admin_rep._id}`,
    };
    return makeRes(res, "", OK, { admin_rep, reps, profile: req.user });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const dashboardLogin = async (req, res) => {
  const payload = req.body;

  const error_fields = [];
  if (!payload?.email) error_fields.push("Email");
  if (!payload?.password) error_fields.push("Password");

  if (error_fields.length)
    return makeRes(
      res,
      `${error_fields.join(", ")} ${
        error_fields.length > 1 ? "are" : "is"
      } required`,
      BAD_REQUEST
    );

  try {
    let rep = await Reps.findOne({ email: payload?.email, admin_id: null })
      .populate("applications")
      .lean();
    if (rep && rep?.password === payload?.password) {
      const rep_token = createToken({ email: rep.email });
      rep = {
        ...rep,
        link: `${process.env.CLIENT_BASE_URL}/apply/${rep._id}`,
      };
      return makeRes(res, "Logged in successfully", OK, {
        rep_token,
        rep,
      });
    }
    return makeRes(res, "Credentials not matched", BAD_REQUEST);
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const changePassword = async (req, res) => {
  const payload = req.body;

  const error_fields = [];
  if (!req?.rep?.email) return makeRes(res, "Session Expired", UNAUTHORIZED);
  if (!payload?.old_password) error_fields.push("Old Password");
  if (!payload?.new_password) error_fields.push("New Password");
  if (!payload?.confirm_password) error_fields.push("Confirm Password");

  if (error_fields.length)
    return makeRes(
      res,
      `${error_fields.join(", ")} ${
        error_fields.length > 1 ? "are" : "is"
      } required`,
      BAD_REQUEST
    );

  if (payload?.new_password !== payload?.confirm_password)
    return makeRes(
      res,
      "New password not matched with confirm password",
      BAD_REQUEST
    );

  try {
    let rep = await Reps.findOne({ email: req.rep?.email, admin_id: null });
    if (rep && rep?.password === payload?.old_password) {
      rep.password = payload?.new_password;
      await rep.save();
      return makeRes(res, "Password changed successfully", OK);
    }
    return makeRes(res, "Old password is incorrect", BAD_REQUEST);
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const listWithApplications = async (req, res) => {
  try {
    let rep = await Reps.findOne({ email: req?.rep?.email, admin_id: null })
      .populate("applications")
      .lean();
    rep = {
      ...rep,
      link: `${process.env.CLIENT_BASE_URL}/apply/${rep._id}`,
    };
    return makeRes(res, "", OK, { rep });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const checkRepExistance = async (req, res) => {
  const id = req.params.id;
  if (!id || !isObjectIdOrHexString(id))
    return makeRes(
      res,
      "Something went wrong. Please refresh and try again",
      BAD_REQUEST
    );
  try {
    const rep = await Reps.findOne({ _id: id });
    if (rep) return makeRes(res, "", OK, { envelopeId: rep._id });
    return makeRes(
      res,
      "Envelope not found. Please contact to admin",
      NOT_FOUND
    );
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};
