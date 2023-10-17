const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;
    if (!name || !mobile || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, mobile, email, password: hashedPassword });
    await user.save();
    const token = await jwt.sign(user._id.toJSON(), process.env.JWT_KEY);
    res.send({ token: token, name: user.name,message:'User added Successfully' });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: "Email & Password is required" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ error: "Invalid Email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ error: "Incorrect password" });
    }
    const token = await jwt.sign(user._id.toJSON(), process.env.JWT_KEY);

    res.send({ token: token, name: user.name });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
