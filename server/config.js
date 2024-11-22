require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
const TOKEN_SUPER_KEY = process.env.SOME_SUPER_SERVER_KEY;
const MESSAGE_ENCODED_KEY = process.env.MESSAGE_ENCODED_KEY;

module.exports = { MONGODB_URI, TOKEN_SUPER_KEY, MESSAGE_ENCODED_KEY };
