import {
  BAD_REQUEST,
  NOT_FOUND,
  OK,
  SERVER_ERROR,
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
    const existingRep = await Reps.findOne({
      name: payload?.name,
      admin_id: null,
    });
    if (existingRep)
      return makeRes(res, "Rep name should be the unique", BAD_REQUEST);
    const existingPasssword =
      (await Reps.findOne({ email: payload?.email }, { password: 1, _id: 0 }))
        ?.password || null;
    payload.password = existingPasssword || generatePassword();
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
    let rep = await Reps.findOne({ _id: payload?._id });
    let hasChange = false;
    let mailChanged = false;
    if (rep.name !== payload?.name) {
      const existingRep = await Reps.findOne({
        name: payload?.name,
        admin_id: null,
      });
      if (existingRep)
        return makeRes(res, "Rep name should be the unique", BAD_REQUEST);
      rep.name = payload?.name;
      hasChange = true;
    }
    if (rep.email !== payload?.email) {
      rep.email = payload?.email;
      hasChange = true;
      mailChanged = true;
    }
    if (hasChange) rep = await rep.save();
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
      applications: ((rep?.applications || []).length || 0).toString(),
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
    let reps = await Reps.find({ email: payload?.email, admin_id: null })
      .populate("applications")
      .lean();
    if (reps.length && reps[0].password === payload.password) {
      const rep_token = createToken({ email: reps[0].email });
      reps = reps.map((_rep) => ({
        ..._rep,
        link: `${process.env.CLIENT_BASE_URL}/apply/${_rep._id}`,
      }));
      return makeRes(res, "Logged in successfully", OK, {
        rep_token,
        reps,
      });
    }
    return makeRes(res, "Credentials not matched", BAD_REQUEST);
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const listWithApplications = async (req, res) => {
  try {
    let reps = [];
    reps = await Reps.find({ email: req?.rep?.email, admin_id: null })
      .populate("applications")
      .lean();
    reps = reps.map((rep) => ({
      ...rep,
      link: `${process.env.CLIENT_BASE_URL}/apply/${rep._id}`,
    }));
    return makeRes(res, "", OK, { reps });
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
