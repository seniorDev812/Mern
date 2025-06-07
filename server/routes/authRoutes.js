import express from "express";
const router = express.Router();
import protect from "../middlewares/authMiddleware.js";

import {
  registerUser,
  login,
  changePassword,
} from "../controllers/authControllers.js";

router.get("/", (req, res) => {
  res.send("Auth Routes");
});

router.post("/register", registerUser);
router.post("/login", login);
router.put("/password", protect, changePassword);

export default router;
