import Task from "../../models/Task.js";

export const getTasksByTagController = async (req, res) => {
  const { tagId } = req.params;
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  try {
    const tasks = await Task.find({ tags: tagId })
      .populate("tags")
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).send(tasks);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};
