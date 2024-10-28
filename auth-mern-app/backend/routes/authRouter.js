const express = require("express");
const { signupValidation,loginValidation } = require("../middlewares/authMiddleware");
const { signup, signin } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/signup", signupValidation, signup);

authRouter.post("/signin", loginValidation, signin);

module.exports = { authRouter };
