import { check } from "express-validator";

export const validateCreateTask = [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters long")
    .isLength({ max: 60 })
    .withMessage("Title must be at least 100 characters long")
];