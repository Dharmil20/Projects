const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { UserModel } = require("../models/user.js");
const { z } = require("zod");
require("dotenv").config();


const signup = async (req, res) => {
  try {
    const requiredBody = z.object({
      email: z.string().min(3).max(30).email(),
      name: z.string().min(3).max(30),
      password: z
        .string()
        .min(8)
        .max(30)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,30}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    });

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
      return res.status(400).json({
        message: "Incorrect format",
        error: parsedDataWithSuccess.error.issues,
      });
    }

    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already Signed up!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email: email,
      password: hashedPassword,
      name: name,
    });

    res.status(200).json({
      message: "User Signed Up!",
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Finding user in database...");
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not signed up!" });
    }

    console.log("Comparing passwords...");
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Credentials", go: false });
    }
    // ✅ Ensure JWT secret exists
    if (!process.env.JWT_USER_PASSWORD) {
      throw new Error("JWT Secret Key is missing!");
    }
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_USER_PASSWORD
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    res.json({
      message: "Logged in successfully",
      token: token,
      go: true,
    });
  } catch (error) {
    console.error("Error in signin:", error);
    res.status(500).json({ message: "Internal Server Error", go: false });
  }
};

module.exports = { signup, signin };
