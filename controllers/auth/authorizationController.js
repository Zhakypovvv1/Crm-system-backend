import bcrypt from "bcrypt";
import Auth from "../../models/Auth.js";
import jwt from "jsonwebtoken";

export const authorizationController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await Auth.findOne({ email });
    if (!findUser) {
      console.log("User not found");
      return res.status(401).send({ message: "Invalid email" });
    }

    const validPassword = bcrypt.compare(password, findUser.hash_pass);
    if (!validPassword) {
      console.log("Invalid password attempt");
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        email: findUser.email,
        userId: findUser._id,
      },
      process.env.JWT_SECRET
    );

    res.status(200).send(token);
  } catch (error) {
    console.error("Error in authorizationController:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
