const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const MessageModel = mongoose.model(
  "message",
  new Schema(
    {
      messageConnectionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      read: {
        type: Boolean,
        require: true,
      },
      isDeleted: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = {
  MessageModel,
  find: async ({ query, projection }) =>
    MessageModel.find(query, projection).lean(),
  findOne: async ({ query, projection }) =>
    MessageModel.findOne(query, projection).lean(),
  create: async ({ insertDict }) => {
    const message = new MessageModel(insertDict);
    const saveMessage = await message.save();
    return saveMessage;
  },
  getAllMessages: async ({ messageConnectionId }) => {
    const pipeline = [
      {
        $match: {
          messageConnectionId: new ObjectId(messageConnectionId),
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users",
        },
      },

      {
        $unwind: {
          path: "$users",
        },
      },
      {
        $project: {
          messageConnectionId: 1,
          message: 1,
          read: 1,
          createdAt: 1,
          updatedAt: 1,
          userId: 1,
          name: "$users.name",
          email: "$users.email",
          hashId: "$users.hashId",
        },
      },
    ];
    return MessageModel.aggregate(pipeline);
  },
};
