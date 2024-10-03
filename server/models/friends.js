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

module.exports = { FriendsModel };
