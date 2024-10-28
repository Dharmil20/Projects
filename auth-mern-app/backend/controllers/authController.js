const { UserModel } = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userFound = await UserModel.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 5);

    if (!userFound) {
      await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });
      res.status(201).json({
        message: "You are Signed Up",
        success: true,
      });
    } else {
      res.status(409).json({
        message: "You are already Signed Up",
        success: false,
      });
    }
  } catch (e) {}
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await UserModel.findOne({ email });
  
  if (!userFound) {
      res.status(403).json({
          message: "User not Signed Up",
          success: false,
        });
        return;
    }
    
    const passwordMatch = bcrypt.compare(password, userFound.password);

  if (passwordMatch) {
    const token = jwt.sign(
      { userId: userFound._id.toString() },
      process.env.JWT_SECRET
    );

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Inavlid Credentials",
    });
  }
};

module.exports = { signup, signin };
