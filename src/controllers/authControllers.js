import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import List from"../models/listModel.js"


export const register = async (req, res) => {
  try {
    const { email, password, user_name, profilePicture } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      user_name,
      profilePicture,
    });
    const savedUser = await newUser.save();
    await List.create({
      title: "My Tasks",
      isChecked: true,
      userId: savedUser._id,
    });
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        user_name: savedUser.user_name,
        profilePicture: savedUser.profilePicture,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ message: "Invalid email or password." });

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordMatch)
      return res.status(400).json({ message: "Invalid email or password." });

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      user: {
        id: existingUser._id,
        email: existingUser.email,
        user_name: existingUser.user_name,
        profilePicture: existingUser.profilePicture,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
