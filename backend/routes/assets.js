import { Router } from "express";
import { BAD_REQUEST, SERVER_ERROR } from "../constants/codes.js";
import { makeRes } from "../helpers/utils.js";
import fs from "fs";
import path from "path";

const router = Router();

router.get("/", async (req, res) => {
  const filename = req.query?.file;
  if (!filename) return makeRes(res, "Missing parameters!", BAD_REQUEST);
  try {
    const fileFullPath = path.join(
      process.cwd(),
      "assets",
      "uploads",
      filename
    );
    const isFileExists = fs.existsSync(fileFullPath);
    if (!isFileExists) return makeRes(res, "Missing media", BAD_REQUEST);
    const sourceFile = fs.readFileSync(fileFullPath);
    res.end(sourceFile);
  } catch (error) {
    return makeRes(res, error.message, SERVER_ERROR);
  }
});

export default router;
