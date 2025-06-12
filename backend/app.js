import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import adminRouter from "./routes/admins.js";
import companiesRouter from "./routes/companies.js";
import path from "path";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log("Cannot Connect: ", e));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/admins", adminRouter);
app.use("/api/companies", companiesRouter);

app.listen(PORT, () => console.log("Server is listening at Port: " + PORT));
