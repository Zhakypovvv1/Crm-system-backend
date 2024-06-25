import express from "express";
import { validateRegister } from "../validators/validateRegister.js";
import { validateErrors } from "../middlewares/validateErrors.js";
import { registerController } from "../controllers/auth/registerController.js";
import { authorizationController } from "../controllers/auth/authorizationController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { updateUserNameController } from "../controllers/auth/updateUserNameController.js";
import { updateUserEmailController } from "../controllers/auth/updateUserEmailController.js";
import { updateUserPasswordController } from "../controllers/auth/updateUserPasswordController .js";

const authRoutes = express.Router();

authRoutes.post(
  "/register",
  validateErrors,
  registerController
);
authRoutes.post("/authorization", authorizationController);
authRoutes.patch("/update-name", verifyToken, updateUserNameController)
authRoutes.patch("/update-email",verifyToken, updateUserEmailController)
authRoutes.patch("/update-password",verifyToken, updateUserPasswordController)

export default authRoutes;
