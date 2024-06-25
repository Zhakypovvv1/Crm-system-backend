import Tag from "../../models/Tag.js";

export const editTagController = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const existingTag = await Tag.findById(id);
    if (!existingTag) {
      return res.status(404).send({ message: "Tag not found" });
    }

    existingTag.name = name;
    const updatedTag = await existingTag.save();

    res.status(200).send({ message: "Tag updated", updatedTag });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
