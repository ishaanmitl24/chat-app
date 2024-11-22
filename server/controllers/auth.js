const { signupService, loginService } = require("../services/authService");

const signupUserContoller = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res.invalid({ msg: "Invalid Email or Password or name!" });
  }
  try {
    const { data, status } = await signupService(name, email, password);
    if (data?.ok) {
      res.success({ msg: data?.msg });
    }
    res.failure({ msg: data?.msg });
  } catch (err) {
    next(err);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.invalid({ msg: "Invalid Email or Password!" });
  }
  try {
    const response = await loginService(email, password);
    res.status(response?.status).json(response?.data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signupUserContoller,
  loginController,
};
