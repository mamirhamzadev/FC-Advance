import { Router } from "express";
import { checkAdminAuth } from "../middlewares/auth.js";
import {
  checkApplicationExistance,
  create,
  list,
} from "../controllers/applications.js";
import { uploadFileInstance } from "../helpers/utils.js";

const router = Router();

router.post("/create", uploadFileInstance.any(), create);
router.post("/check", checkApplicationExistance);
router.get("/list", checkAdminAuth, list);

export default router;
