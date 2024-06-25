import Note from "../../models/Note.js";
import Task from "../../models/Task.js";

export const deleteNoteController = async (req, res) => {
  const { noteId } = req.params;
  try {
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).send("Note not found");
    }

    await Task.findByIdAndUpdate(note.taskId, { $pull: { notes: noteId } });

    await Note.findByIdAndDelete(noteId);
    res.status(200).send({ message: "Note deleted" });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
};
