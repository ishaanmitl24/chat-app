const UserModel = require("../models/user");
const FriendsDataModel = require("../models/friendsData");
const MessageConnectionModel = require("../models/messageConnection");
const FriendsModel = require("../models/friends");
const bcrypt = require("bcrypt");
const MessageModel = require("../models/message");
const { MESSAGE_ENCODED_KEY } = require("../config");
const {
  encryptSomeText,
  decryptSomeText,
} = require("../utils/encryptAndDecrypt");

const messageLimit = 6;

const checkChatIsAlreadyExistsOrNot = async ({ senderId, receiverId }) => {
  const obj = {};
  const findFriendsOfSender = await FriendsDataModel.findOne({
    query: {
      userId: senderId,
      isDeleted: false,
    },
    projection: {
      friends: 1,
      messagesId: 1,
    },
  });

  const {
    friends: senderFriendsConnectionId,
    messagesId: senderMessagesIds,
  } = findFriendsOfSender;

  const friendsData = await FriendsModel.find({
    query: {
      _id: { $in: senderFriendsConnectionId.map((item) => item.toString()) },
    },
    projection: {
      _id: 1,
      users: 1,
      messageConnectionId: 1,
    },
  });

  const findReceiverInSendersFriends = friendsData?.filter((friend) => {
    const users = friend?.users || [];
    return JSON.stringify(users).includes(receiverId.toString());
  });

  const { _id: id, messageConnectionId } = findReceiverInSendersFriends?.[0];

  let checkMessageConnectionExistInSenderData;
  if (messageConnectionId) {
    const modifiedMessageConnectionData = senderMessagesIds?.map((item) =>
      item.toString()
    );
    checkMessageConnectionExistInSenderData = JSON.stringify(
      modifiedMessageConnectionData
    ).includes(messageConnectionId.toString());
  }

  obj.messageConnectionId = messageConnectionId?.toString() || "";
  obj.checkMessage = checkMessageConnectionExistInSenderData ?? false;
  obj.friendId = id?.toString() ?? "";

  return obj;
};

const createChat = async ({ senderId, receiverId }) => {
  try {
    const senderUserData = await UserModel.findOne({
      query: { _id: senderId, isDeleted: false },
      projection: {},
    });
    if (!senderUserData) {
      return {
        status: 422,
        data: {
          ok: false,
          msg: "Invalid sender id",
        },
      };
    }

    const receiverUserData = await UserModel.findOne({
      query: {
        _id: receiverId,
        isDeleted: false,
      },
      projection: {},
    });
    if (!receiverUserData) {
      return {
        status: 422,
        data: {
          ok: false,
          msg: "Invalid receiver id",
        },
      };
    }

    const senderEndData = await checkChatIsAlreadyExistsOrNot({
      senderId,
      receiverId,
    });

    const receiverEndData = await checkChatIsAlreadyExistsOrNot({
      senderId: receiverId,
      receiverId: senderId,
    });

    console.log(senderEndData, receiverEndData);

    if (
      senderEndData?.friendId !== "" &&
      receiverEndData?.friendId !== "" &&
      senderEndData?.friendId === receiverEndData?.friendId
    ) {
      if (
        senderEndData?.messageConnectionId !== "" &&
        receiverEndData?.messageConnectionId !== "" &&
        senderEndData?.messageConnectionId ===
          receiverEndData?.messageConnectionId &&
        senderEndData?.checkMessage &&
        receiverEndData?.checkMessage
      ) {
        const data = {
          messageConnectionId: senderEndData.messageConnectionId,
        };
        return {
          status: 200,
          data: {
            ok: true,
            msg: "Chat already exists",
            data,
          },
        };
      } else {
        const { friendId } = senderEndData;
        const users = [senderId, receiverId];
        const insertDict = { friendId, users };
        const craetedata = await MessageConnectionModel.MessageConnectionModel(
          insertDict
        );
        const createMessageConnection = await craetedata.save();
        if (createMessageConnection) {
          const { _id: messageConnectionId } = createMessageConnection;
          await FriendsDataModel.updateMany({
            query: {
              userId: { $in: [senderId, receiverId] },
              isDeleted: false,
            },
            updateDict: {
              $push: {
                messagesId: messageConnectionId,
              },
            },
          });

          await FriendsModel.updateOne({
            query: { _id: friendId, isDeleted: false },
            updateDict: {
              $set: {
                messageConnectionId: messageConnectionId,
              },
            },
          });
          const data = {
            messageConnectionId,
          };
          return {
            status: 200,
            data: {
              ok: true,
              msg: "Chat created successfully",
              data,
            },
          };
        }
      }
    } else {
      return {
        status: 200,
        data: {
          ok: false,
          msg: `${senderUserData?.name} and ${receiverUserData?.name} are not friends`,
        },
      };
    }
  } catch (err) {
    return {
      status: err?.status || 500,
      data: { ok: false, msg: err?.message || "Something went wrong!" },
    };
  }
};

const sendMessage = async ({ messageConnectionId, userId, message }) => {
  try {
    //Check user id exist or not
    const checkSenderExistOrNot = await UserModel.findOne({
      query: {
        _id: userId,
        isDeleted: false,
      },
      projection: {},
    });

    if (!checkSenderExistOrNot) {
      return {
        status: 422,
        data: {
          ok: false,
          msg: "Invalid user id",
        },
      };
    }

    // Check message connection id exist or not
    const checkMessageId = await MessageConnectionModel.findOne({
      query: {
        _id: messageConnectionId,
        isDeleted: false,
      },
      projection: {},
    });

    if (!checkMessageId) {
      return {
        status: 422,
        data: {
          ok: false,
          msg: "Invalid message connection id",
        },
      };
    }

    const hashMessage = encryptSomeText({
      dataToEncrypt: message,
      encryptKey: MESSAGE_ENCODED_KEY,
    });

    const insertDict = {
      messageConnectionId,
      userId,
      message: hashMessage,
    };

    const sendMessageData = await MessageModel.create({ insertDict });
    const messageData = await MessageModel.findOne({
      query: {
        _id: sendMessageData._id.toString(),
      },
      projection: {
        messageConnectionId: 1,
        userId: 1,
        _id: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    });
    const data = {
      ...messageData,
      message,
      name: checkSenderExistOrNot?.name,
      email: checkSenderExistOrNot?.email,
      hashId: checkSenderExistOrNot?.hashId,
    };

    if (!sendMessageData) {
      return {
        status: 404,
        data: {
          ok: false,
          msg: "Not able to send message",
        },
      };
    } else {
      return {
        status: 200,
        data: {
          ok: true,
          msg: "Message sent successfully",
          data,
        },
      };
    }
  } catch (err) {
    return {
      status: err?.status || 500,
      data: {
        ok: false,
        msg: err?.message || "Something went wrong!",
      },
    };
  }
};

const getUserAllMessages = async ({ userId, page = 1 }) => {
  const skip = (page - 1) * messageLimit;
  try {
    const checkUserExist = await UserModel.findOne({
      query: {
        _id: userId,
        isDeleted: false,
      },
      projection: {},
    });

    if (!checkUserExist) {
      return {
        status: 422,
        data: {
          ok: false,
          msg: "user does not exist!",
        },
      };
    }
    const query = {
      userId,
      isDeleted: false,
    };
    const projection = {
      messagesId: 1,
    };
    const userfriendsData = await FriendsDataModel.findOne({
      query,
      projection,
    });

    const messagesId = userfriendsData?.messagesId?.slice(
      skip,
      skip + messageLimit
    );

    const totalMessageDocs = userfriendsData.messagesId.length;
    if (messagesId?.length > 0) {
      const usersData = await MessageConnectionModel.find({
        query: {
          _id: { $in: messagesId },
          isDeleted: false,
        },
        projection: {
          _id: 1,
          users: 1,
        },
      });
      const modifiedUserData = usersData?.map((user) => {
        const friendUserId = user?.users.filter(
          (item) => item.toString() !== userId.toString()
        )?.[0];
        return {
          messageConnectionId: user._id.toString(),
          friendUserId,
        };
      });

      const data = [];
      for await (user of modifiedUserData) {
        const obj = {};
        const { friendUserId, messageConnectionId } = user;
        obj.friendUserId = friendUserId;
        obj.messageConnectionId = messageConnectionId;
        const userData = await UserModel.findOne({
          query: {
            _id: friendUserId,
            isDeleted: false,
          },
          projection: { name: 1, hashId: 1, email: 1 },
        });

        const messageData = await MessageModel.MessageModel.findOne({
          messageConnectionId,
          isDeleted: false,
        }).sort({ createdAt: -1 });
        let decryptMessage = "";
        if (messageData?.message ?? "") {
          decryptMessage = decryptSomeText({
            dataToDecrypt: messageData?.message,
            decryptKey: MESSAGE_ENCODED_KEY,
          });
        }
        obj.user = userData;
        obj.messageData = messageData
          ? { ...messageData._doc, message: decryptMessage }
          : {};
        data.push(obj);
      }
      return {
        status: 200,
        data: {
          ok: true,
          msg: "messages",
          data,
          pages: Math.ceil(totalMessageDocs / messageLimit),
          totalMessageCount: totalMessageDocs,
        },
      };
    } else {
      return {
        status: 200,
        data: {
          ok: true,
          msg: "No messages found",
          data: [],
        },
      };
    }
  } catch (err) {
    return {
      status: err?.status || 500,
      data: {
        ok: false,
        msg: err?.message || "Something went wrong!",
      },
    };
  }
};

const getMessage = async ({ messageConnectionId, userId }) => {
  try {
    const messageConnectionCheck = await MessageConnectionModel.findOne({
      query: {
        _id: messageConnectionId,
        isDeleted: false,
      },
      projection: {},
    });

    if (!messageConnectionCheck) {
      return {
        status: 422,
        data: {
          ok: false,
          msg: "Invalid message id!",
        },
      };
    }

    const friendUserId = messageConnectionCheck?.users.filter(
      (user) => user.toString() !== userId
    )?.[0];

    const userFriendData = await UserModel.findOne({
      query: {
        _id: friendUserId,
      },
      projection: {
        _id: 1,
        name: 1,
        email: 1,
        hashId: 1,
      },
    });

    const messagesData = await MessageModel.getAllMessages({
      messageConnectionId,
    });

    const modifiedMessageData = messagesData?.map((data) => {
      const decryptedMessage = decryptSomeText({
        dataToDecrypt: data?.message,
        decryptKey: MESSAGE_ENCODED_KEY,
      });
      return {
        ...data,
        message: decryptedMessage,
        userId: data?.userId.toString(),
        messageConnectionId: data?.messageConnectionId.toString(),
      };
    });

    if (modifiedMessageData) {
      return {
        status: 200,
        data: {
          ok: true,
          data: modifiedMessageData,
          friend: userFriendData,
          msg: modifiedMessageData.length
            ? "Messages fetched successfully"
            : "No Messsage found",
        },
      };
    } else {
      throw new Error("Not able to fetch messages");
    }
  } catch (err) {
    return {
      status: err?.status || 500,
      data: {
        ok: false,
        msg: err?.message || "Something went wrong!",
      },
    };
  }
};

module.exports = { createChat, sendMessage, getUserAllMessages, getMessage };
