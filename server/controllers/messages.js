const mongoose = require("mongoose");
const MessageService = require("../services/message");

const createChat = async (req, res, next) => {
  const { senderId, receiverId } = req.body;
  if (
    !mongoose.isValidObjectId(senderId) ||
    !mongoose.isValidObjectId(receiverId)
  ) {
    return res.status(422).json({ ok: false, msg: "Invalid user id" });
  }
  try {
    const response = await MessageService.createChat({ senderId, receiverId });
    const { status, data } = response;

    res.status(status).json(data);
  } catch (err) {
    console.log(err);
  }
};

const sendMessage = async (req, res, next) => {
  const { messageConnectionId, message, userId } = req.body;
  console.log(req.body);
  if (!mongoose.isValidObjectId(messageConnectionId)) {
    return res.status(422).json({
      ok: false,
      data: {
        msg: "Invalid Message Id",
      },
    });
  }
  if (!mongoose.isValidObjectId(userId)) {
    return res.status(422).json({
      ok: false,
      data: {
        msg: "Invalid user id",
      },
    });
  }
  if (!message) {
    return res.status(422).json({
      ok: false,
      data: {
        msg: "Message can't be empty",
      },
    });
  }
  try {
    const response = await MessageService.sendMessage({
      messageConnectionId,
      userId,
      message,
    });
    const { status, data } = response;

    res.status(status).json(data);
  } catch (err) {
    console.log(err);
  }
};

const getUserAllMessages = async (req, res, next) => {
  const { userId } = req.params;
  const { page } = req.query;
  if (!mongoose.isValidObjectId(userId)) {
    return res.status(422).json({ ok: false, msg: "Invalid user id" });
  }
  try {
    const { status, data } = await MessageService.getUserAllMessages({
      userId,
      page: parseInt(page),
    });

    res.status(status).json(data);
  } catch (err) {
    console.log(err);
  }
};

const getMessages = async (req, res, next) => {
  const { messageConnectionId, userId } = req.params;
  if (!mongoose.isValidObjectId(messageConnectionId)) {
    return res
      .status(422)
      .json({ ok: false, msg: "Invalid message connection id" });
  }
  if (!mongoose.isValidObjectId(userId)) {
    return res.status(422).json({ ok: false, msg: "Invalid user id" });
  }
  try {
    const { status, data } = await MessageService.getMessage({
      messageConnectionId,
      userId,
    });
    res.status(status).json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sendMessage,
  createChat,
  getUserAllMessages,
  getMessages,
};
