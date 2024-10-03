const express = require("express");
const cors = require("cors");
const { ConnectDB } = require("./utils/connectMongoDB");
const authRouter = require("./routes/auth");
const friendsRoute = require("./routes/friends");
const { authHandler } = require("./middlewares/authMiddleware");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/friend", authHandler, friendsRoute);

ConnectDB(() => {
  app.listen(4001, () => {
    console.log("Server Listening on 4001");
  });
});
