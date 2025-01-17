import { check } from "express-validator";

export const validateUserProfile = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("Name must be at most 50 characters long"),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
];
