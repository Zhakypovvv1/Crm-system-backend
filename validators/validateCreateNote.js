import { check } from "express-validator";

export const validateCreateNote = [
  check("text")
    .notEmpty()
    .withMessage("Text is required")
    .isLength({ min: 5 })
    .withMessage("Text must be at least 5 characters long")
    .isLength({ max: 500 })
    .withMessage("Text must be at most 500 characters long"),
];
