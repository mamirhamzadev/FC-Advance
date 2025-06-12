import { Router } from "express";
import { checkAdminAuth } from "../middlewares/auth.js";
import {
  create,
  update,
  remove,
  get,
  list,
  getEnvelopeId,
} from "../controllers/companies.js";
import { uploadFileInstance } from "../helpers/utils.js";

const router = Router();

router.post("/get-envelope-id", getEnvelopeId);

router.post("/create", uploadFileInstance.any(), create);
router.post("/update", uploadFileInstance.any(), checkAdminAuth, update);
router.delete("/remove/:id", checkAdminAuth, remove);
router.get("/get/:id", checkAdminAuth, get);
router.get("/list", checkAdminAuth, list);

export default router;
