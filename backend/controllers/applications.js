import { isObjectIdOrHexString } from "mongoose";
import { BAD_REQUEST, CREATED, OK, SERVER_ERROR } from "../constants/codes.js";
import { makeRes, sendMail } from "../helpers/utils.js";
import Admin from "../models/Admin.js";
import Application from "../models/Application.js";
import Reps from "../models/Reps.js";

export const create = async (req, res) => {
  let payload = req.body;

  const empty_fields = [];
  if (!payload?.submitted_by?.full_name) empty_fields.push("Your Full Name");
  if (!payload?.submitted_by?.email) empty_fields.push("Your Email");
  else {
    const application = await Application.findOne({
      "submitted_by.email": payload?.submitted_by?.email,
    }).lean();
    if (application)
      return makeRes(
        res,
        "Your application has already been submitted",
        CREATED,
        {
          is_submitted: true,
        }
      );
  }

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
    const rep =
      payload?.envelope_id && isObjectIdOrHexString(payload?.envelope_id)
        ? await Reps.findOne({ _id: payload?.envelope_id })
        : null;
    const company = await Application.create(payload);
    if (rep) {
      rep.applications.push(company._id);
      await rep.save();
    }
    const admin = await Admin.find({}, { _id: 0, email: 1 });
    const sendToEmails = [
      company.submitted_by.email,
      ...admin.map((adm) => adm.email),
    ];
    if (rep) sendToEmails.push(rep.email);
    await sendMail(
      sendToEmails,
      rep
        ? `Form Submitted for Rep - (${rep?.name})`
        : "Form submitted without Rep",
      "form-submission.html",
      {
        "{{rep_name_line}}": rep
          ? `Form Submitted for Rep - (${rep?.name})`
          : "Form submitted without Rep",
        "{{submitted_by_email}}": company?.submitted_by.email,
        "{{submitted_by_full_name}}": company?.submitted_by.full_name,
        "{{business_name}}": company?.business.name,
        "{{business_type}}": company?.business.type,
        "{{business_website}}": company?.business.website,
        "{{business_tax_id}}": company?.business.tax_id,
        "{{business_start_date}}": new Date(company?.business.start_date)
          ?.toISOString()
          ?.split("T")?.[0],
        "{{business_state_of_incorporation}}":
          company?.business.state_of_incorporation,
        "{{business_industry}}": company?.business.industry,
        "{{business_phone}}": company?.business.phone,
        "{{business_address}}": company?.business.address,
        "{{business_city}}": company?.business.city,
        "{{business_state}}": company?.business.state,
        "{{business_zip}}": company?.business.zip,

        "{{owner_full_name}}": company?.owner.full_name,
        "{{owner_ownership_percent}}": company?.owner.ownership_percent,
        "{{owner_email}}": company?.owner.email,
        "{{owner_ssn}}": company?.owner.ssn,
        "{{owner_phone}}": company?.owner.phone,
        "{{owner_fico_score}}": company?.owner.fico_score,
        "{{owner_address_line_1}}": company?.owner.address.line1,
        "{{owner_address_line_2}}": company?.owner.address.line2,
        "{{owner_city}}": company?.owner.city,
        "{{owner_state}}": company?.owner.state,
        "{{owner_zip}}": company?.owner.zip,
        "{{owner_dob}}": new Date(company?.owner.dob)
          ?.toISOString()
          ?.split("T")?.[0],

        "{{partner_full_name}}": company?.partner?.full_name,
        "{{partner_ownership_percent}}": company?.partner?.ownership_percent,
        "{{partner_email}}": company?.partner?.email,
        "{{partner_ssn}}": company?.partner?.ssn,
        "{{partner_phone}}": company?.partner?.phone,
        "{{partner_fico_score}}": company?.partner?.fico_score,
        "{{partner_address_line_1}}": company?.partner?.address.line1,
        "{{partner_address_line_2}}": company?.partner?.address.line2,
        "{{partner_city}}": company?.partner?.city,
        "{{partner_state}}": company?.partner?.state,
        "{{partner_zip}}": company?.partner?.zip,
        "{{partner_dob}}": new Date(company?.partner?.dob)
          ?.toISOString()
          ?.split("T")?.[0],
        "{{media}}": company.media
          .filter((file) => !!file)
          .map((file) => file.split("\\").pop())
          .map(
            (file) =>
              `<a 
                href="${process.env.SERVER_BASE_URL}/uploads/${file}" 
                target="_blank" 
                title="${file}"
                download>
                Download<br/>Media
              </a>`
          )
          .join(""),
      }
    );
    return makeRes(res, "Application submitted successfully", OK, {
      is_submitted: true,
      company,
    });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const checkApplicationExistance = async (req, res) => {
  const payload = req.body;

  const empty_fields = [];
  if (!payload?.submitted_by?.full_name) empty_fields.push("Full Name");
  if (!payload?.submitted_by?.email) empty_fields.push("Email");

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
    const application = await Application.findOne({
      "submitted_by.email": payload?.submitted_by?.email,
    }).lean();
    if (application)
      return makeRes(
        res,
        "Your Application has already been submitted",
        CREATED,
        {
          is_submitted: true,
        }
      );
    return makeRes(res, "", OK, { application: payload });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const list = async (req, res) => {
  const without_rep = req.query?.without_rep === "1";
  try {
    const applications = without_rep
      ? await Application.find({ is_applied: true, envelope_id: "" })
      : await Application.find({ is_applied: true });
    return makeRes(res, "", OK, { applications, profile: req.user });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};
