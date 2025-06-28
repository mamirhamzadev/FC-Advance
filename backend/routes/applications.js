import { Router } from "express";
import { checkAdminAuth } from "../middlewares/auth.js";
import {
  checkApplicationExistance,
  create,
  get,
  list,
  renderPdf,
} from "../controllers/applications.js";
import { uploadFileInstance } from "../helpers/utils.js";

const router = Router();

router.post("/create", uploadFileInstance.any(""), create);
router.post("/check", checkApplicationExistance);
router.get("/get/:id", checkAdminAuth, get);
router.get("/list", checkAdminAuth, list);
router.get("/pdf/:id", renderPdf);

export default router;
