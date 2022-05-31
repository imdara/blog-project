import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// importing models
import User from "../models/user.js";

export const signUserUp = async (req, res) => {
  const { name, email, password } = req.body;
  const emailExist = await User.findOne({ email });
  if (!emailExist) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({ name, email, password: hashedPassword });
    res.send("User signed up successfully");
  } else res.send(`${email} is already registered`);
};

export const logUserIn = async (req, res) => {
  const { email, password } = req.body;
  const emailExist = await User.findOne({ email });
  if (!emailExist) {
    res.send({ message: `${email} is not registered` });
  } else {
    const passwordCheck = await bcrypt.compare(password, emailExist.password);
    if (passwordCheck) {
      const user = { name: emailExist.name };
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5d",
      });
      res.send({ message: "User logged in succesfully", token });
    } else res.send({ message: "Password entered is incorrect" });
  }
};
