const jwt = require("jsonwebtoken");
const { TOKEN_SUPER_KEY } = require("../config");

const authHandler = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  const token = authorization && authorization.split(" ")[1];
  if (!token) {
    res.status(401).json({ ok: false, msg: "Unauthorized Access!" });
  } else {
    const tokenVerify = jwt.verify(token, TOKEN_SUPER_KEY);
    if (tokenVerify) {
      req.userId = tokenVerify.id;
      req.email = tokenVerify.email;
    } else {
      res.status(401).json({ ok: false, msg: "Unauthorized Access!" });
    }
  }
  next();
};

module.exports = { authHandler };
