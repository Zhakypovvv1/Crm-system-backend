import Details from "../../models/Details.js";
import Task from "../../models/Task.js";

export const createTaskDetailsController = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.details) {
      return res
        .status(400)
        .json({ message: "Details already exist for this task" });
    }

    const newDetails = new Details({
      text: description,
      taskId: task._id,
    });

    const savedDetails = await newDetails.save();

    task.details = savedDetails._id;
    await task.save();

    const populatedTask = await Task.findById(id).populate("details");

    if (!populatedTask.details.text) {
      return res
        .status(500)
        .json({ message: "Text field is missing in details" });
    }

    res.status(200).json({ message: "Details created", task: populatedTask });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
