export const updateUserEmailController = async (req, res) => {
  const { userId } = req.user;
  const { email } = req.body;

  try {
    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    await user.updateEmail(email);

    res.status(200).send({ message: "User email updated", user });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};
