const { signupService, loginService } = require("../services/authService");

const signupUserContoller = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res
      .status(422)
      .json({ msg: "Invalid Email or Password or name!", ok: false });
  }
  try {
    const response = await signupService(name, email, password);
    res.status(response.status).json(response.data);
  } catch (err) {
    next(err);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ msg: "Invalid Email or Password!", ok: false });
  }
  try {
    const response = await loginService(email, password);
    res.status(response.status).json(response.data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signupUserContoller,
  loginController,
};
