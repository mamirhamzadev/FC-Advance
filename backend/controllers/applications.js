import { BAD_REQUEST, CREATED, OK, SERVER_ERROR } from "../constants/codes.js";
import { makeRes, sendMail } from "../helpers/utils.js";
import Application from "../models/Application.js";
import Company from "../models/Application.js";
import Reps from "../models/Reps.js";

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
    const rep = await Reps.findOne({ _id: payload?.envelope_id });
    if (!rep)
      return makeRes(
        res,
        "Something went wrong with the link. Please contact to admin",
        BAD_REQUEST
      );
    const company = await Company.create(payload);
    rep.applications.push(company._id);
    await rep.save();
    await sendMail(
      [company.submitted_by.email, rep.email],
      `Form Submitted for Company - (${rep?.name})`,
      "form-submission.html",
      {
        "{{company_name}}": rep.name,
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

        "{{partner_full_name}}": company?.partner.full_name,
        "{{partner_ownership_percent}}": company?.partner.ownership_percent,
        "{{partner_email}}": company?.partner.email,
        "{{partner_ssn}}": company?.partner.ssn,
        "{{partner_phone}}": company?.partner.phone,
        "{{partner_fico_score}}": company?.partner.fico_score,
        "{{partner_address_line_1}}": company?.partner.address.line1,
        "{{partner_address_line_2}}": company?.partner.address.line2,
        "{{partner_city}}": company?.partner.city,
        "{{partner_state}}": company?.partner.state,
        "{{partner_zip}}": company?.partner.zip,
        "{{partner_dob}}": new Date(company?.partner.dob)
          ?.toISOString()
          ?.split("T")?.[0],
      }
    );
    return makeRes(res, "Applied successfully", OK, {
      company: company,
      is_submitted: true,
    });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const checkApplicationExistance = async (req, res) => {
  const payload = req.body;

  if (!payload?.envelope_id)
    return makeRes(
      res,
      "Something went wrong with the link. Please contact to admin",
      BAD_REQUEST
    );
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
      envelope_id: payload?.envelope_id,
      "submitted_by.email": payload?.submitted_by?.email,
    }).lean();
    if (application) return makeRes(res, "", CREATED, { is_submitted: true });
    return makeRes(res, "", OK, { application: payload });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const list = async (req, res) => {
  try {
    const companies = await Company.find({ is_applied: true });
    return makeRes(res, "", OK, { companies, profile: req.user });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};
