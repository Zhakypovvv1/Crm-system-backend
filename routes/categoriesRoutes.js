import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createCategoryController } from "../controllers/categories/createCategoryController.js";
import { getCategoriesController } from "../controllers/categories/getCategoriesController.js";
import { getTasksByCategoryController } from "../controllers/categories/getTasksByCategoryController.js";
import { deleteCategoryController } from "../controllers/categories/deleteCategoryController.js";
import { validateCategory } from "../validators/validateCategory.js";

const categoriesRoutes = express.Router();

categoriesRoutes.post("/create-category", verifyToken, validateCategory, createCategoryController);
categoriesRoutes.get("/get-categories", verifyToken, getCategoriesController);
categoriesRoutes.delete("/delete-category/:id", deleteCategoryController);
categoriesRoutes.get("/:categoryId/get-tasks-by-category", verifyToken, getTasksByCategoryController);

export default categoriesRoutes;