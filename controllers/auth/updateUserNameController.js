import Auth from "../../models/Auth.js";

export const updateUserNameController = async (req, res) => {
  const { userId } = req.user;
  const { name } = req.body;

  try {
    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    await user.updateName(name);

    res.status(200).send({ message: "User name updated", user });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};
