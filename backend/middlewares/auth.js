import { UNAUTHORIZED } from "../constants/codes.js";
import {
  getTokenPayload,
  makeRes,
  normalizeProfile,
} from "../helpers/utils.js";
import Admin from "../models/Admin.js";
import Reps from "../models/Reps.js";

export const checkAdminAuth = async (req, res, next) => {
  let token = req.headers?.authorization;
  if (!token) return next();
  token = token.split(" ") || [];
  token = token.length > 1 ? token[1] : "";
  if (!token) return makeRes(res, "Unauthorized", UNAUTHORIZED);
  try {
    const payload = await getTokenPayload(token);
    const user = await Admin.findById(payload?._id);
    if (!user) return makeRes(res, "Unauthorized", UNAUTHORIZED);
    req.user = normalizeProfile(user._doc);
    next();
  } catch (e) {
    return makeRes(res, "Unauthorized", UNAUTHORIZED);
  }
};

export const checkRepAuth = async (req, res, next) => {
  let token = req.headers?.authorization?.split(" ") || [];
  token = token.length > 1 ? token[1] : "";
  if (!token) return makeRes(res, "Unauthorized", UNAUTHORIZED);
  try {
    const payload = await getTokenPayload(token);
    const rep = await Reps.findOne({ email: payload?.email });
    if (!rep) return makeRes(res, "Unauthorized", UNAUTHORIZED);
    req.rep = { email: rep.email };
    next();
  } catch (e) {
    return makeRes(res, "Unauthorized", UNAUTHORIZED);
  }
};
