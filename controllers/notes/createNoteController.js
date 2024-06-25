import Note from "../../models/Note.js";
import Task from "../../models/Task.js";

export const createNoteController = async (req, res) => {
  const { taskId } = req.params;
  const { text } = req.body;
  console.log(text);
  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).send("Task not found");
    }

    const newNote = new Note({
      text,
      taskId: task._id,
    });

    const savedNote = await newNote.save();
    task.notes.push(savedNote._id);
    await task.save();
    res.status(201).send({ message: "Note created", note: savedNote });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
};
