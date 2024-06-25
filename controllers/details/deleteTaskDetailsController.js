import Details from "../../models/Details.js";
import Task from "../../models/Task.js";

export const deleteTaskDetailsController = async (req, res) => {
    const { id } = req.params;
    try {
      const details = await Details.findById(id);
  
      if (!details) {
        return res.status(404).send("Details not found");
      }
  
      const taskId = details.taskId;
  
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).send("Task not found");
      }
  
      await Details.findByIdAndDelete(id);
      task.details = null;
      await task.save();
  
      res.status(200).send({ message: "Details deleted" });
    } catch (e) {
      console.error(e);
      return res.status(500).send("Internal Server Error");
  }
};
