import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { addTagsToTaskController } from "../controllers/tag/addTagsToTaskController.js";
import { createTagController } from "../controllers/tag/createTagController.js";
import { getTagsController } from "../controllers/tag/getTagsController.js";
import { getTasksByTagController } from "../controllers/tag/getTasksByTagController.js";
import { editTagController } from "../controllers/tag/editTagController.js";
import { deleteTagController } from "../controllers/tag/deleteTagController.js";
import { validateTag } from "../validators/validateTag.js";

const tagRoutes = express.Router();

tagRoutes.post("/create-tag", verifyToken, validateTag, createTagController);
tagRoutes.get("/get-tags", verifyToken, getTagsController);
tagRoutes.post("/:taskId/addTag-to-task", verifyToken, addTagsToTaskController);
tagRoutes.patch("edit-tag/:id", verifyToken, editTagController);
tagRoutes.delete("delete-tag/:id", deleteTagController);
tagRoutes.get("/:tagId/tasks", verifyToken, getTasksByTagController);

export default tagRoutes;
