import Tag from "../../models/Tag.js";

export const getTagsController = async (req, res) => {
  const { userId } = req.user;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  try {
    const tags = await Tag.find({ userId })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).send(tags);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};
