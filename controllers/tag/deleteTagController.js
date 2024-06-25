import Tag from "../../models/Tag.js";

export const deleteTagController = async (req, res) => {
  const { id } = req.params;

  try {
    const tag = await Tag.findByIdAndDelete(id);

    if (!tag) {
      return res.status(404).send({ message: "Tag not found" });
    }

    res.status(200).send({ message: "Tag deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};
