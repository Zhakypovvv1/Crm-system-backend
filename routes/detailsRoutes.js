import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createTaskDetailsController } from "../controllers/details/createTaskDetailsController.js";
import { getTaskDetailsController } from "../controllers/details/getTaskDetailsController.js";
import { deleteTaskDetailsController } from "../controllers/details/deleteTaskDetailsController.js";
import { editTaskDetailsController } from "../controllers/details/editTaskDetailsController.js";
const detailsRoutes = express.Router();

detailsRoutes.post("/:id/create-details", verifyToken, createTaskDetailsController);
detailsRoutes.get("/:id/get-details", verifyToken, getTaskDetailsController);
detailsRoutes.delete("/:id/delete-details", deleteTaskDetailsController)
detailsRoutes.patch("/:id/edit-details",verifyToken, editTaskDetailsController)


export default detailsRoutes;