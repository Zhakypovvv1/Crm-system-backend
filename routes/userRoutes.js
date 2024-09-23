import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getUserInfoController } from "../controllers/user/getUserInfoController.js";
import { uploadAvatarController } from "../controllers/user/uploadAvatarController.js";
import upload from "../middlewares/multer.js";
import { updateProfileController } from "../controllers/user/updateProfileController.js";
import { validateUserProfile } from "../validators/validateUserProfile.js";
import { updatePasswordController } from "../controllers/user/updatePasswordController.js";
const userRoutes = express.Router();

userRoutes.get("/user-info", verifyToken, getUserInfoController);
userRoutes.patch(
  "/upload-avatar",
  verifyToken,
  upload.single("avatar"),
  uploadAvatarController
);
userRoutes.patch(
  "/update-profile",
  verifyToken,
  validateUserProfile,
  updateProfileController
);
userRoutes.patch(
  "/update-password",
  verifyToken,
  updatePasswordController
);
export default userRoutes;
