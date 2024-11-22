const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageConnectionModel = mongoose.model(
  "messageConnection",
  new Schema(
    {
      users: {
        type: Array,
        required: true,
      },
      friendId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
  MessageConnectionModel,
  findOne: async ({ query, projection }) =>
    MessageConnectionModel.findOne(query, projection).lean(),
  find: async ({ query, projection }) =>
    MessageConnectionModel.find(query, projection).lean(),
  create: ({ insertDict }) => new MessageConnectionModel(insertDict).save(),
};
