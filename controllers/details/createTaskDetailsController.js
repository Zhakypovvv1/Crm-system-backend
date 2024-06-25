import Details from "../../models/Details.js";
import Task from "../../models/Task.js";

export const createTaskDetailsController = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).send("Task not found");
    }

    if (task.details) {
      return res.status(400).send("Details alreeady exist for this task");
    }

    const newDetails = new Details({
      text,
      taskId: task._id,
    });

    const savedDetails = await newDetails.save();
    task.details = savedDetails._id;
    await task.save();

    res.status(200).send({ message: "Details created", details: savedDetails });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};
