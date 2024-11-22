const express = require("express");
const cors = require("cors");
const { ConnectDB } = require("./utils/connectMongoDB");
const responses = require("./middlewares/response");
const authRouter = require("./routes/auth");
const friendsRoute = require("./routes/friends");
const messageRoute = require("./routes/messages");
const { authHandler } = require("./middlewares/authMiddleware");

const app = express();
app.use(express.json());
app.use(cors());

app.use(responses);

app.use("/auth", authRouter);
app.use("/friend", authHandler, friendsRoute);
app.use("/messages", authHandler, messageRoute);

app.use((err, req, res, next) => {
  const data = err?.data || [];
  const msg = err?.msg || "SERVER DOWN";
  res.internalServerError({ msg: err.message, err, ok: false });
});

ConnectDB(() => {
  app.listen(4001, () => {
    console.log("Server Listening on 4001");
  });
});
