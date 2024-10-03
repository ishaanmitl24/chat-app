const UserModel = require("../models/user");
const { ConnectionModel, pendingRequest } = require("../models/connection");
const { FriendsModel } = require("../models/friends");
const { FriendsDataModel, getFriends } = require("../models/friendsData");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const limit = 7;
const pendingRequestLimit = 3;
const friendsLimit = 3;

const getSearchPeopleService = async (search, page, userId) => {
  const skip = (page - 1) * limit;
  const alreadySentUsers = await ConnectionModel.find({
    $and: [
      { $or: [{ sendersId: userId }, { receiversId: userId }] },
      { status: { $in: ["pending", "accepted"] } },
    ],
  });

  const userIdsInFriendsAndRequest = [];

  const getFriendsData = await getFriends({ userId });
  const getFriendsModifiedData =
    getFriendsData.length && getFriendsData[0]?.users?.flatMap((user) => user);

  const pendingRequests = await pendingRequest({
    receiversId: userId,
    status: "pending",
  });

  for (let i = 0; i < getFriendsModifiedData.length; i++) {
    if (getFriendsModifiedData[i] !== userId) {
      userIdsInFriendsAndRequest.push(getFriendsModifiedData[i]);
    }
  }

  for (let i = 0; i < alreadySentUsers.length; i++) {
    userIdsInFriendsAndRequest.push(alreadySentUsers[i].receiversId.toString());
  }

  for (let i = 0; i < pendingRequests.length; i++) {
    userIdsInFriendsAndRequest.push(pendingRequests[i].userId.toString());
  }

  const userData = await UserModel.find({
    $and: [
      {
        _id: {
          $nin: [userId, ...userIdsInFriendsAndRequest],
        },
      },
      { isDeleted: false },
      {
        $or: [
          { name: new RegExp(search, "i") },
          { hashId: new RegExp(search, "i") },
        ],
      },
    ],
  })
    .skip(skip)
    .limit(limit);

  if (!userData.length) {
    return {
      status: 200,
      data: {
        msg: `No such user found with this ${search}`,
        ok: true,
        users: [],
        pages: 0,
      },
    };
  } else {
    const newUserData = userData.map((item) => {
      return {
        id: item.id,
        name: item.name,
        email: item.email,
        hashId: item.hashId,
      };
    });
    const totalUsersCount = await UserModel.countDocuments({
      $and: [
        {
          _id: {
            $nin: [userId, ...userIdsInFriendsAndRequest],
          },
        },
        { isDeleted: false },
        {
          $or: [
            { name: new RegExp(search, "i") },
            { hashId: new RegExp(search, "i") },
          ],
        },
      ],
    });
    const pages = Math.ceil(totalUsersCount / limit);
    return {
      status: 200,
      data: {
        users: newUserData,
        msg: "User Founds",
        pages: pages,
        ok: true,
      },
    };
  }
};

const addFriendService = async (sendersId, receiversId) => {
  const checSenderIdExistorNot = await UserModel.findOne({ _id: sendersId });
  if (!checSenderIdExistorNot) {
    return {
      status: 422,
      data: {
        ok: false,
        msg: "Invalid sender and receiver Ids",
      },
    };
  }

  const checkReceiverExistOrNot = await UserModel.findOne({ _id: receiversId });
  if (!checkReceiverExistOrNot) {
    return {
      status: 422,
      data: {
        ok: false,
        msg: "Invalid sender and receiver Ids",
      },
    };
  }
  const checkRequestExistOrNot = await ConnectionModel.findOne({
    sendersId,
    receiversId,
    status: "pending",
  });
  if (checkRequestExistOrNot) {
    return {
      status: 422,
      data: {
        ok: false,
        msg: "Request already sent!",
      },
    };
  } else {
    const checkRequestExistForOpposite = await ConnectionModel.findOne({
      sendersId: receiversId,
      receiversId: sendersId,
      status: "pending",
    });
    if (checkRequestExistForOpposite) {
      return {
        status: 422,
        data: {
          ok: false,
          msg: "Request already sent!",
        },
      };
    }
    const newConnection = await ConnectionModel({
      sendersId,
      receiversId,
      status: "pending",
    });
    const result = await newConnection.save();
    if (result) {
      return {
        status: 200,
        data: {
          ok: true,
          msg: "Friend request sent successfully!",
        },
      };
    } else {
      return {
        status: 422,
        data: {
          ok: false,
          msg: "Something went wrong while sending request!",
        },
      };
    }
  }
};

const getPendingRequestsServices = async (userId, page = 1) => {
  const newPage = parseInt(page);
  const skip = (newPage - 1) * pendingRequestLimit;

  const checkUser = await UserModel.findOne({ _id: userId });
  if (!userId) {
    return {
      status: 422,
      data: {
        ok: false,
        msg: "Invalid userId",
      },
    };
  }
  const pendindRequestCount = await pendingRequest({
    receiversId: userId,
    status: "pending",
  });
  const pendingRequests = await pendingRequest({
    receiversId: userId,
    status: "pending",
    skip: skip,
    limit: pendingRequestLimit,
    pagination: true,
  });

  return {
    status: 200,
    data: {
      requests: pendingRequests,
      ok: true,
      totalRequest: pendindRequestCount.length,
      pages: Math.ceil(pendindRequestCount.length / pendingRequestLimit),
      msg: pendingRequests
        ? "Pending requests fetched successfully!"
        : "No pending Requests",
    },
  };
};

const respondToRequestService = async (status, connectionId, userId) => {
  const updateTheRequest = await ConnectionModel.findOneAndUpdate(
    {
      _id: connectionId,
      status: "pending",
    },
    { $set: { status: status } },
    { returnOriginal: false }
  );

  if (updateTheRequest) {
    const users = [
      updateTheRequest.sendersId.toString(),
      updateTheRequest.receiversId.toString(),
    ];
    if (status === "accepted") {
      const addFriend = await FriendsModel({
        connectionId: connectionId,
        users,
      });
      const result = await addFriend.save();
      if (result) {
        const findUserFriendModel = await FriendsDataModel.find({
          userId: { $in: users },
          isDeleted: false,
        });
        if (!findUserFriendModel) {
          return {
            status: 422,
            data: {
              ok: false,
              msg: "Invalid Users",
            },
          };
        }

        await FriendsDataModel.findOneAndUpdate(
          {
            userId: users[0],
            isDeleted: false,
          },
          {
            $push: { friends: result._id },
          },
          { returnOriginal: false }
        );

        await FriendsDataModel.findOneAndUpdate(
          {
            userId: users[1],
            isDeleted: false,
          },
          {
            $push: { friends: result._id },
          },
          { returnOriginal: false }
        );
      }
    }
    return {
      status: 200,
      data: {
        ok: true,
        msg: `Friend request ${status} successfully!`,
      },
    };
  } else {
    return {
      status: 422,
      data: {
        ok: false,
        msg: "Invalid Request",
      },
    };
  }
};

const getFriendsService = async (userId, page = 1) => {
  const newPage = parseInt(page);
  const skip = (newPage - 1) * friendsLimit;
  const checkFriendsData = await FriendsDataModel.findOne({ userId: userId });

  if (checkFriendsData) {
    const getFriendsCount = await getFriends({ userId });
    const getFriendsData = await getFriends({
      userId,
      skip,
      limit: friendsLimit,
      pagination: true,
    });
    const getFriendsModifiedData = getFriendsData[0].users.flatMap(
      (user) => user
    );
    const getFriendsUserIdsArr = getFriendsModifiedData.filter(
      (item) => item !== userId
    );
    const getFriendsUserData = await UserModel.find({
      _id: { $in: getFriendsUserIdsArr },
      isDeleted: false,
    });

    const modifiedFriendsData = getFriendsUserData.map((user) => {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        hashId: user.hashId,
      };
    });

    return {
      status: 200,
      data: {
        ok: true,
        friends: modifiedFriendsData,
        pages: Math.ceil(getFriendsCount[0].users.length / friendsLimit),
        totalFriends: getFriendsCount[0].users.length,
        msg: "Friends fetched successfully!",
      },
    };
  } else {
    return {
      status: 200,
      data: {
        ok: false,
        msg: "Invalid User",
      },
    };
  }
};

module.exports = {
  getSearchPeopleService,
  addFriendService,
  getPendingRequestsServices,
  respondToRequestService,
  getFriendsService,
};
