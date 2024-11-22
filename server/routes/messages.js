const express = require("express");

const router = express.Router();
const {
  sendMessage,
  createChat,
  getUserAllMessages,
  getMessages,
} = require("../controllers/messages");

router.post("/send-message", sendMessage);

router.post("/create-chat", createChat);

router.get("/get-all-messages/:userId", getUserAllMessages);

router.get("/get-messages/:messageConnectionId/:userId", getMessages);

module.exports = router;
