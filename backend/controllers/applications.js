import { isObjectIdOrHexString } from "mongoose";
import {
  BAD_REQUEST,
  CREATED,
  NOT_FOUND,
  OK,
  SERVER_ERROR,
} from "../constants/codes.js";
import { makeRes, sendMail } from "../helpers/utils.js";
import Admin from "../models/Admin.js";
import Application from "../models/Application.js";
import Reps from "../models/Reps.js";
import puppeteer from "puppeteer";
import { readFileSync } from "fs";
import path from "path";

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
        "Your application has already been submitted! Please contact us for furthur details.",
        CREATED,
        {
          is_submitted: true,
        }
      );
  }

  if (!payload?.business?.name) empty_fields.push("Legal Company Name");
  if (!payload?.business?.type) empty_fields.push("Doing Business As");
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
    const files = req?.files || [];
    let signatures = files.find((file) => file.fieldname === "signature");
    if (!signatures)
      return makeRes(res, "Signatures are required", BAD_REQUEST);
    signatures = `uploads?file=${signatures.filename}`;
    let media = files.filter((file) => file.fieldname === "attachment");
    media = media.map((file) => `uploads?file=${file.filename}`);

    const application = await Application.create({
      ...payload,
      media,
      signatures,
    });

    let rep = null;
    if (payload?.envelope_id && isObjectIdOrHexString(payload?.envelope_id))
      rep = await Reps.findOne({ _id: payload?.envelope_id });

    if (rep) {
      rep.applications.push(application._id);
      await rep.save();
    }
    const admin = await Admin.find({}, { _id: 0, email: 1 });
    const sendToEmails = [application.submitted_by.email];
    if (rep) sendToEmails.push(rep.email);
    const mailTo = sendToEmails;
    const mailSubject = rep
      ? `Form Submitted through Rep - (${rep?.name})`
      : "Form submitted from website";
    const mailTemplate = "application-email.html";
    await sendMail(mailTo, mailSubject, mailTemplate, {
      "{{rep_details}}": "",
      "{{full_name}}": application.submitted_by.full_name,
      "{{email}}": application.submitted_by.email,
      "{{download_url}}": `${process.env.SERVER_BASE_URL}/api/applications/pdf/${application._id}`,
    });
    await sendMail(
      admin.map((adm) => adm.email),
      mailSubject,
      mailTemplate,
      {
        "{{rep_details}}": rep
          ? `<h3>REP Details:</h3>
                <p style="font-weight: bold !important">
                  Full Name:
                  <span style="font-weight: normal !important"
                    >${rep.name}</span
                  >
                </p>
                <p style="font-weight: bold !important; margin-bottom: 30px !important;">
                  Email:
                  <span style="font-weight: normal !important">${rep.email}</span>
                </p>`
          : "",
        "{{full_name}}": application.submitted_by.full_name,
        "{{email}}": application.submitted_by.email,
        "{{download_url}}": `${process.env.SERVER_BASE_URL}/api/applications/pdf/${application._id}`,
      }
    );
    return makeRes(
      res,
      "Application submitted successfully!<br/>You have been received an email in which you can see your submitted responses. In case of any query, please contact us for assisstance.",
      OK,
      {
        is_submitted: true,
        application,
      }
    );
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
        "Your application has already been submitted! Please contact us for furthur details.",
        CREATED,
        { is_submitted: true }
      );
    return makeRes(res, "", OK, { application: payload });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const get = async (req, res) => {
  const id = req.params?.id;
  if (!id || !isObjectIdOrHexString(id))
    return makeRes(res, "Application not found", NOT_FOUND);

  try {
    const application = await Application.findOne({ _id: id }).lean();

    const rep = application.envelope_id
      ? await Reps.findOne(
          { _id: application.envelope_id },
          { email: 1, name: 1 }
        ).lean()
      : null;
    if (application)
      return makeRes(res, "", OK, { application, rep, profile: req.user });
    return makeRes(res, "Application not found", NOT_FOUND);
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const list = async (req, res) => {
  const without_rep = req.query?.without_rep === "1";
  try {
    const query = without_rep ? { envelope_id: "" } : {};
    const applications = await Application.find(query);
    return makeRes(res, "", OK, { applications, profile: req.user });
  } catch (e) {
    return makeRes(res, e.message, SERVER_ERROR);
  }
};

export const renderPdf = async (req, res) => {
  const appId = req.params?.id;
  if (!appId || !isObjectIdOrHexString(appId))
    res.send("<h1>Application not found. Please try again</h1>");

  try {
    const application = await Application.findOne({ _id: appId });
    if (!application)
      return res.send("<h1>Application not found. Please try again</h1>");
    let rep = null;
    if (application.envelope_id)
      rep = await Reps.findOne({ _id: application.envelope_id });

    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    let html = readFileSync(
      path.join(process.cwd(), "templates", "application-pdf.html"),
      "utf-8"
    );

    const dataToReplace = prepareTemplateData(application, rep);
    Object.keys(dataToReplace).forEach(
      (key) => (html = html.replaceAll(key, dataToReplace[key]))
    );
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: { top: 10, bottom: 10, left: 20, right: 20 },
    });
    await browser.close();
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="application-${application.submitted_by.full_name}.pdf"`,
      "Content-Length": pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (e) {
    res.send(e.message);
  }
};

const prepareTemplateData = (application, rep) => {
  if (!application) return {};
  return {
    "{{rep_name_line}}": rep
      ? `<p>Application Submitted through Rep:</p>
        <div style="margin-top: 10px; margin-bottom: 10px;">
          <p style="font-size: 16px;">
            REP Name: 
            <span style="font-weight: normal;">${rep.name}</span>
          </p>
          <p style="font-size: 16px;">
            REP Email: 
            <span style="font-weight: normal;">${rep.email}</span>
          </p>
        <div>`
      : "Application submitted from website",
    "{{submitted_by_email}}": application?.submitted_by.email || "N/A",
    "{{submitted_by_full_name}}": application?.submitted_by.full_name || "N/A",
    "{{business_name}}": application?.business.name || "N/A",
    "{{business_type}}": application?.business.type || "N/A",
    "{{business_website}}": application?.business.website
      ? `<a href="${application.business.website}" target="_blank">View Business</a>`
      : `<p style="font-style: italic; color: gray; font-size: 14px;">No Webiste</p>`,
    "{{business_tax_id}}": application?.business.tax_id || "N/A",
    "{{business_start_date}}": new Date(application?.business.start_date)
      ?.toISOString()
      ?.split("T")?.[0],
    "{{business_state_of_incorporation}}":
      application?.business.state_of_incorporation || "N/A",
    "{{business_industry}}": application?.business.industry || "N/A",
    "{{business_phone}}": application?.business.phone || "N/A",
    "{{business_address}}": application?.business.address || "N/A",
    "{{business_city}}": application?.business.city || "N/A",
    "{{business_state}}": application?.business.state || "N/A",
    "{{business_zip}}": application?.business.zip || "N/A",

    "{{owner_full_name}}": application?.owner.full_name || "N/A",
    "{{owner_ownership_percent}}":
      application?.owner.ownership_percent || "N/A",
    "{{owner_email}}": application?.owner.email || "N/A",
    "{{owner_ssn}}": application?.owner.ssn || "N/A",
    "{{owner_phone}}": application?.owner.phone || "N/A",
    "{{owner_fico_score}}": application?.owner.fico_score || "N/A",
    "{{owner_address_line_1}}": application?.owner.address.line1 || "N/A",
    "{{owner_address_line_2}}": application?.owner.address.line2 || "N/A",
    "{{owner_city}}": application?.owner.city || "N/A",
    "{{owner_state}}": application?.owner.state || "N/A",
    "{{owner_zip}}": application?.owner.zip || "N/A",
    "{{owner_dob}}": new Date(application?.owner.dob)
      ?.toISOString()
      ?.split("T")?.[0],

    "{{partner_full_name}}": application?.partner?.full_name || "N/A",
    "{{partner_ownership_percent}}":
      application?.partner?.ownership_percent || "N/A",
    "{{partner_email}}": application?.partner?.email || "N/A",
    "{{partner_ssn}}": application?.partner?.ssn || "N/A",
    "{{partner_phone}}": application?.partner?.phone || "N/A",
    "{{partner_fico_score}}": application?.partner?.fico_score || "N/A",
    "{{partner_address_line_1}}": application?.partner?.address.line1 || "N/A",
    "{{partner_address_line_2}}": application?.partner?.address.line2 || "N/A",
    "{{partner_city}}": application?.partner?.city || "N/A",
    "{{partner_state}}": application?.partner?.state || "N/A",
    "{{partner_zip}}": application?.partner?.zip || "N/A",
    "{{partner_dob}}": application?.partner?.dob
      ? new Date(application?.partner?.dob)?.toISOString()?.split("T")?.[0]
      : "N/A",
    "{{signatures}}": `${process.env.SERVER_BASE_URL}/${application.signatures}`,
    "{{media}}": (application.media || []).length
      ? application.media
          .map(
            (file) => `<a 
                href="${process.env.SERVER_BASE_URL}/${file}" 
                target="_blank" 
                title="${file.split("=")[1]}"
                style="display: block !important; margin-bottom: 10px !important;"
                download="${file.split("=")[1]}">
                ${file.split("=")[1]}
              </a>`
          )
          .join("")
      : `<p style="color: gray !important; font-size: 14px !important;">No files attached</p>`,
  };
};
