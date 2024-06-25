import Details from "../../models/Details.js";
import Note from "../../models/Note.js";
import Task from "../../models/Task.js";

export const deleteTaskController = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    if (task.details) {
      const deletedDetails = await Details.findByIdAndDelete(task.details);
      if (!deletedDetails) {
        return res.status(404).send({ message: "Details not found" });
      }
    }

    if (task.notes && task.notes.length > 0) {
      const deletedNotes = await Note.deleteMany({ _id: { $in: task.notes } });
      if (deletedNotes.deletedCount === 0) {
        return res.status(404).send({ message: "Notes not found" });
      }
    }

    await Task.findByIdAndDelete(taskId);

    res.status(200).send({ message: "Task and related details/notes deleted" });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};
