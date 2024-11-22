const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const FriendsDataModel = mongoose.model(
  "friendsData",
  new Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      friends: {
        type: Array,
        required: true,
        default: [],
      },
      messagesId: {
        type: Array,
        required: true,
        default: [],
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
  FriendsDataModel,
  find: async ({ query, projection }) =>
    FriendsDataModel.find(query, projection),
  findOne: async ({ query, projection }) =>
    FriendsDataModel.findOne(query, projection),
  updateOne: async ({ query, updateDict }) =>
    FriendsDataModel.updateOne(query, updateDict),
  updateMany: async ({ query, updateDict }) =>
    FriendsDataModel.updateMany(query, updateDict),
  countDocuments: async ({ query }) => FriendsDataModel.countDocuments(query),
  getFriends: ({ userId, skip, limit, pagination = false }) => {
    const pipeline = [
      {
        $match: {
          userId: new ObjectId(userId),
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "friends",
          localField: "friends",
          foreignField: "_id",
          as: "friendsConnection",
        },
      },
    ];
    if (pagination) {
      pipeline.push({
        $unwind: {
          path: "$friendsConnection",
        },
      });
      pipeline.push({ $skip: skip });
      pipeline.push({ $limit: limit });
      pipeline.push({
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          friendsConnection: {
            $push: "$friendsConnection",
          },
        },
      });
    }
    pipeline.push({
      $project: {
        _id: 1,
        userId: 1,
        users: "$friendsConnection.users",
      },
    });
    return FriendsDataModel.aggregate(pipeline);
  },
};
