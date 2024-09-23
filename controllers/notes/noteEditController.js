import Note from "../../models/Note.js";

export const noteEditController = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  console.log(id);
  console.log(text);
  try {
    const note = await Note.findById(id);
    console.log(note);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    note.text = text;

    await note.save();
    res.status(200).send({ message: "Note updated", note });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
};
