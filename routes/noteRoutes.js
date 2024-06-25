import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createNoteController } from "../controllers/notes/createNoteController.js";
import { getNotesController } from "../controllers/notes/getNotesController.js";
import { deleteNoteController } from "../controllers/notes/deleteNoteController.js";
import { noteEditController } from "../controllers/notes/noteEditController.js";
import { validateCreateNote } from "../validators/validateCreateNote.js";

const noteRoutes = express.Router();

noteRoutes.post(
  "/:taskId/create-note",
  verifyToken,
  validateCreateNote,
  createNoteController
);
noteRoutes.get("/:taskId/get-notes", verifyToken, getNotesController);
noteRoutes.delete("/:noteId/note-delete", deleteNoteController);
noteRoutes.patch("/:noteId/note-edit", verifyToken, noteEditController);

export default noteRoutes;
