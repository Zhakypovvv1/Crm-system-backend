import Task from "../../models/Task.js";

export const getTaskDetailsController = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id).populate("details");
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.status(200).send({ task });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};
