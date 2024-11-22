const mongoose = require("mongoose");
const { Schema } = mongoose;

const FriendsModel = mongoose.model(
  "friends",
  new Schema(
    {
      connectionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      users: {
        type: Array,
        required: true,
      },
      messageConnectionId: {
        type: mongoose.Schema.Types.ObjectId,
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
  FriendsModel,
  find: async ({ query, projection }) =>
    FriendsModel.find(query, projection).lean(),
  findOne: async ({ query, projection }) =>
    FriendsModel.findOne(query, projection).lean(),
  updateOne: async ({ query, updateDict }) =>
    FriendsModel.updateOne(query, updateDict),
};
