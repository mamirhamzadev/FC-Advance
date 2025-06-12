import * as Yup from "yup";
import { PROPOSAL_STATUSES } from "../constants";

export const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const passwordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const changePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const updateProfileValidationSchema = Yup.object().shape({
  _id: Yup.string(),
  name: Yup.string().required("Name is required"),
  username: Yup.string()
    .required("Username is required")
    .test("start-with-letter", "Username must start with a letter", (value) =>
      /^[A-Za-z]/.test(value)
    )
    .test(
      "no-spaces",
      "Username cannot contain spaces",
      (value) => !/\s/.test(value)
    )
    .test(
      "only-letters-numbers-underscore",
      "Username can only contain letters, numbers, and underscores",
      (value) => /^[A-Za-z0-9_]+$/.test(value)
    )
    .test(
      "min-length",
      "Username must be at least 8 characters long",
      (value) => value && value.length >= 8
    ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const createDeveloperValidationSchema = Yup.object().shape({
  _id: Yup.string(),
  name: Yup.string().required("Name is required"),
  username: Yup.string()
    .required("Username is required")
    .test("start-with-letter", "Username must start with a letter", (value) =>
      /^[A-Za-z]/.test(value)
    )
    .test(
      "no-spaces",
      "Username cannot contain spaces",
      (value) => !/\s/.test(value)
    )
    .test(
      "only-letters-numbers-underscore",
      "Username can only contain letters, numbers, and underscores",
      (value) => /^[A-Za-z0-9_]+$/.test(value)
    )
    .test(
      "min-length",
      "Username must be at least 8 characters long",
      (value) => value && value.length >= 8
    ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().when("$isUpdatingRecord", {
    is: false, // When creating a new record, password is required
    then: (schema) =>
      schema
        .min(8, "Password must be at least 8 characters long")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[^a-zA-Z0-9]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
    otherwise: (schema) => schema.notRequired(), // When updating, password is optional
  }),
});

export const proposalValidationSchema = Yup.object().shape({
  _id: Yup.string(),
  title: Yup.string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title cannot exceed 100 characters"),
  description: Yup.string().max(
    2000,
    "Description cannot exceed 2000 characters"
  ),
  country: Yup.mixed().test(
    "is-valid-country",
    "Invalid country ID",
    (value) =>
      !value ||
      (typeof value === "string" && /^[0-9a-fA-F]{24}$/.test(value)) ||
      (value &&
        typeof value === "object" &&
        /^[0-9a-fA-F]{24}$/.test(value._id))
  ),
  clientCompany: Yup.string().max(
    100,
    "Company name cannot exceed 100 characters"
  ),
  salaryBudget: Yup.object().shape({
    amount: Yup.number()
      .positive("Amount must be a positive number")
      .required("Salary amount is required"),
    type: Yup.string()
      .required("Salary type is required")
      .oneOf(
        ["hourly", "daily", "weekly", "monthly", "quarterly", "annual"],
        "Invalid salary type"
      ),
  }),
  applicant: Yup.mixed().test(
    "is-valid-applicant",
    "Invalid Applicant ID",
    (value) =>
      !value ||
      (typeof value === "string" && /^[0-9a-fA-F]{24}$/.test(value)) ||
      (value &&
        typeof value === "object" &&
        /^[0-9a-fA-F]{24}$/.test(value._id))
  ),
  interview: Yup.object().shape({
    date: Yup.date().min(new Date(), "Interview date cannot be in the past"),
    feedback: Yup.string().max(500, "Feedback cannot exceed 500 characters"),
  }),
  proposal: Yup.object().shape({
    feedback: Yup.string().max(500, "Feedback cannot exceed 500 characters"),
    sentAt: Yup.date().max(new Date(), "Sent date cannot be in the future"),
  }),
  source: Yup.object().shape({
    platform: Yup.mixed().test(
      "is-valid-platform",
      "Invalid Platform ID",
      (value) =>
        !value ||
        (typeof value === "string" && /^[0-9a-fA-F]{24}$/.test(value)) ||
        (value &&
          typeof value === "object" &&
          /^[0-9a-fA-F]{24}$/.test(value._id))
    ),
    link: Yup.string()
      .required("Job posting link is required")
      .url("Invalid URL format"),
    postedAt: Yup.date()
      .max(new Date(), "Posted date cannot be in the future")
      .required("Posted At Date is required"),
  }),
  requirements: Yup.object().shape({
    techStacks: Yup.array().of(
      Yup.string().matches(/^[0-9a-fA-F]{24}$/, "Invalid tech stack ID")
    ),
  }),
  additionalNote: Yup.string().max(
    2000,
    "Additional note cannot exceed 2000 characters"
  ),
  isFollowUpRequired: Yup.boolean(),
  status: Yup.string()
    .required("Status is required")
    .oneOf(
      PROPOSAL_STATUSES?.map((proposal) => proposal?.value),
      "Invalid status"
    ),
});
