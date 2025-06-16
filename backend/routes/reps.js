import { Router } from "express";
import { checkAdminAuth, checkRepAuth } from "../middlewares/auth.js";
import {
  create,
  update,
  remove,
  get,
  list,
  checkRepExistance,
  listWithApplications,
  dashboardLogin,
} from "../controllers/reps.js";

const router = Router();

router.post("/create", checkAdminAuth, create);
router.post("/update", checkAdminAuth, update);
router.delete("/remove/:id", checkAdminAuth, remove);
router.get("/get/:id", checkAdminAuth, get);
router.get("/list", checkAdminAuth, list);

router.post("/dashboard/login", dashboardLogin);
router.get("/list-with-applications", checkRepAuth, listWithApplications);
router.get("/check/:id", checkRepExistance);

export default router;
