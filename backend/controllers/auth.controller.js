import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({
      username: username,
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!!!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!!!" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
    //next(error);
  }
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({
      username: req.body.username,
    });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }
    user = new User({
      username,
      email,
      password,
    });
    await user.save();
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    //return res.sendStatus(200);
    res.status(200).json({ message: "Sign-up successful" });
    // setTimeout(() => {
    //   res.status(200).json({ message: "Sign-up successful" });
    // }, 3000);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
    //next(error);
  }
};
