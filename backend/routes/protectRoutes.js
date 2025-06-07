import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { checkLogin } from "../controllers/protectControllers.js";

const router = express.Router();

router.get("/", protect, checkLogin);

export default router;
