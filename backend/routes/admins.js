import { Router } from "express";
import { checkAdminAuth } from "../middlewares/auth.js";
import {
  changePassword,
  dashboard,
  listUsers,
  login,
  profile,
  sendOtp,
  update,
  verifyOTP,
} from "../controllers/admins.js";
import { uploadFileInstance } from "../helpers/utils.js";

const router = Router();

router.post("/login", login);
router.post(
  "/update",
  checkAdminAuth,
  uploadFileInstance.single("imageBlob"),
  update
);
router.get("/profile", checkAdminAuth, profile);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOTP);
router.post("/change-password", checkAdminAuth, changePassword);
router.get("/list-users", checkAdminAuth, listUsers);
router.get("/dashboard", checkAdminAuth, dashboard);

export default router;
