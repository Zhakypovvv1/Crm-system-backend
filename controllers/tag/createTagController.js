import Tag from "../../models/Tag.js";

export const createTagController = async (req, res) => {
  const { userId } = req.user;

  try {
    const { name } = req.body;
    const newTag = await Tag.create({
      name,
      userId,
    });
    res.status(201).send({ message: "Tag created", tag: newTag });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
};