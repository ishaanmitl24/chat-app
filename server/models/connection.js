const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const ConnectionModel = mongoose.model(
  "connections",
  new Schema(
    {
      sendersId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      receiversId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "dismissed"],
        default: "pending",
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = {
  ConnectionModel,
  find: ({ query, projection }) => ConnectionModel.find(query, projection),
  findOne: ({ query, projection }) =>
    ConnectionModel.findOne(query, projection),
  pendingRequest: ({
    receiversId,
    status,
    skip,
    limit,
    pagination = false,
  }) => {
    const pipeline = [
      {
        $match: {
          receiversId: new ObjectId(receiversId),
          status: status,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "sendersId",
          foreignField: "_id",
          as: "data",
        },
      },
      {
        $unwind: "$data",
      },
      {
        $project: {
          _id: 1,
          status: 1,
          name: "$data.name",
          hashId: "$data.hashId",
          email: "$data.email",
          userId: "$data._id",
        },
      },
    ];
    if (pagination) {
      pipeline.push({ $skip: skip });
      pipeline.push({ $limit: limit });
    }
    return ConnectionModel.aggregate(pipeline);
  },
};
