const jwt = require("jsonwebtoken");
const { TOKEN_SUPER_KEY } = require("../config");

const createToken = (email, id) => {
  const token = jwt.sign({ email: email, id: id }, TOKEN_SUPER_KEY, {
    expiresIn: "7D",
  });
  return token;
};

module.exports = { createToken };
