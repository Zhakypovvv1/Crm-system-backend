import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateCreateTask } from "../validators/validateCreateTask.js";
import { getTasksController } from "../controllers/tasks/getTasksController.js";
import { toggleTaskController } from "../controllers/tasks/toggleTaskController.js";
import { createTaskController } from "../controllers/tasks/createTaskController.js";
import { editTaskController } from "../controllers/tasks/editTaskController.js";
import { deleteTaskController } from "../controllers/tasks/deleteTaskController.js";

const taskRoutes = express.Router();

taskRoutes.post(
  "/create-task",
  verifyToken,
  validateCreateTask,
  createTaskController
);
taskRoutes.get("/get-tasks", verifyToken, getTasksController);
taskRoutes.patch("/toggle-status/:id", verifyToken, toggleTaskController);
taskRoutes.patch("/edit-task/:taskId", verifyToken, editTaskController);
taskRoutes.delete("/delete-task/:taskId", deleteTaskController);

export default taskRoutes;
