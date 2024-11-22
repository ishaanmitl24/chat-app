require("dotenv").config();
require("../utils/connectMongoDB").ConnectDB(() => {});
const { FriendsDataModel } = require("../models/friendsData");

const addEmptyArrayInFriendsData = async () => {
  try {
    await FriendsDataModel.updateMany(
      {
        isDeleted: false,
      },
      {
        $set: { messagesId: [] },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addEmptyArrayInFriendsData };

// node -e 'require("./scripts/addEmptyArrayInFriendsData").addEmptyArrayInFriendsData()'
