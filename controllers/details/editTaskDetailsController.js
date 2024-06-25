import Details from "../../models/Details.js";

export const editTaskDetailsController = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const details = await Details.findById(id);

    if (!details) {
      return res.status(404).send("Details not found");
    }

    details.text = text;

    await details.save();

    res
      .status(200)
      .send({ message: "Details updated", details });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};
