import { BAD_REQUEST, OK, SERVER_ERROR } from "../constants/codes.js";
import { makeRes } from "../helpers/utils.js";
import Company from "../models/Company.js";
import crypto from "crypto";

export const getEnvelopeId = async (req, res) => {
  let payload = req.body;
  const empty_fields = [];
  if (!payload?.submitted_by?.full_name) empty_fields.push("Your Full Name");
  if (!payload?.submitted_by?.email) empty_fields.push("Your Email");
  if (empty_fields.length) {
    return makeRes(
      res,
      `${empty_fields.join(", ")} ${
        empty_fields.length > 1 ? "are" : "is"
      } mandatory field(s)`,
      BAD_REQUEST
    );
  }

  try {
    const existingCompany = await Company.findOne({
      "submitted_by.email": payload.submitted_by?.email,
    }).lean();
    if (existingCompany)
      return makeRes(
        res,
        existingCompany.is_applied ? "Already applied" : "",
        OK,
        {
          company: existingCompany,
        }
      );
    const envelope_id = crypto.randomUUID();
    payload = { ...payload, envelope_id };
    const company = await Company.create(payload);
    return makeRes(res, "", OK, { company });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const create = async (req, res) => {
  let payload = req.body;

  const empty_fields = [];
  if (!payload?.submitted_by?.full_name) empty_fields.push("Your Full Name");
  if (!payload?.submitted_by?.email) empty_fields.push("Your Email");

  if (!payload?.business?.name) empty_fields.push("Legal Company Name");
  if (!payload?.business?.type) empty_fields.push("Doing Business As");
  if (!payload?.business?.website) empty_fields.push("Company Website");
  if (!payload?.business?.tax_id) empty_fields.push("Tax ID/EIN");
  if (!payload?.business?.start_date) empty_fields.push("Business Start Date");
  if (!payload?.business?.state_of_incorporation)
    empty_fields.push("State of Incorporation");
  if (!payload?.business?.industry) empty_fields.push("Industry");
  if (!payload?.business?.phone) empty_fields.push("Business Phone");
  if (!payload?.business?.address) empty_fields.push("Business Address");
  if (!payload?.business?.city) empty_fields.push("Business City");
  if (!payload?.business?.state) empty_fields.push("Business State");
  if (!payload?.business?.zip) empty_fields.push("Business Zip");

  if (!payload?.owner?.full_name) empty_fields.push("Owner Full Name");
  if (!payload?.owner?.ownership_percent)
    empty_fields.push("Owner Ownership %");
  if (!payload?.owner?.email) empty_fields.push("Owner Business Email");
  if (!payload?.owner?.ssn) empty_fields.push("Owner Social Security Number");
  if (!payload?.owner?.phone) empty_fields.push("Owner Phone");
  if (!payload?.owner?.fico_score) empty_fields.push("Owner FICO Score");
  if (!payload?.owner?.address?.line1)
    empty_fields.push("Owner Address Line 1");
  if (!payload?.owner?.city) empty_fields.push("Owner City");
  if (!payload?.owner?.state) empty_fields.push("Owner State");
  if (!payload?.owner?.zip) empty_fields.push("Owner Zip");
  if (!payload?.owner?.dob) empty_fields.push("Owner Date of Birth");

  if (empty_fields.length) {
    return makeRes(
      res,
      `${empty_fields.join(", ")} ${
        empty_fields.length > 1 ? "are" : "is"
      } mandatory field(s)`,
      BAD_REQUEST
    );
  }

  try {
    const EXPECTED_MEDIAS = [
      "attachment1",
      "attachment2",
      "attachment3",
      "attachment4",
    ];
    const files = req?.files || [];
    const media = EXPECTED_MEDIAS.map((name) => {
      const file = files.find((file) => file.fieldname === name);
      let url = "";
      if (!file && payload?.[name]) url = payload[name];
      else if (file) url = file.path;
      return url;
    });
    payload = { ...payload, media, is_applied: true };
    const company = await Company.findOneAndUpdate(
      { "submitted_by.email": payload?.submitted_by?.email },
      payload,
      { new: true }
    ).lean();
    return makeRes(res, "Applied successfully", OK, { company: company });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const update = async (req, res) => {};

export const remove = async (req, res) => {
  const id = req?.params?.id;

  if (!id) return makeRes(res, "Refresh the page and try again", BAD_REQUEST);
  try {
    const result = await Company.deleteOne({ _id: id });
    if (result.deletedCount)
      return makeRes(res, "Company deleted", OK, { profile: req.user });
    return makeRes(
      res,
      "Company cannot deleted. Pleae refresha nd try again",
      BAD_REQUEST
    );
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const get = async (req, res) => {};

export const list = async (req, res) => {
  try {
    const companies = await Company.find({ is_applied: true });
    return makeRes(res, "", OK, { companies, profile: req.user });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};
