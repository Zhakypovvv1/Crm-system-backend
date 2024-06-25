import bcrypt from "bcrypt";
import Auth from "../../models/Auth.js";
import jwt from "jsonwebtoken";

export const authorizationController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await Auth.findOne({ email });
    if (!findUser) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, findUser.hash_pass);
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { email: findUser.email, userId: findUser._id },
      process.env.JWT_SECRET
    );

    res.status(200).send(token);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
