const express = require("express");

const authRouter = express.Router();
const { signupUserContoller, loginController } = require("../controllers/auth");

authRouter.post("/login", loginController);

authRouter.post("/signup", signupUserContoller);

module.exports = authRouter;
