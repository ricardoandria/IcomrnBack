import Users from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const UserExisting = await Users.findOne({ email: req.body.email });
    if (UserExisting) {
      throw new Error("Email is already using with another account");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await Users.create({
      ...req.body,
      password: hashedPassword,
    });
    const { password, ...others } = newUser._doc;
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({ others, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (!user) {
      throw new Error("User is not existing");
    }

    const comparedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!comparedPassword) {
      throw new Error("Wrong password");
    }

    const { password, ...others } = user._doc;
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ others, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
