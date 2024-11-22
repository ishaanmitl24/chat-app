const { v4: uuidv4 } = require("uuid");
const bycrypt = require("bcrypt");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const UserModel = require("../models/user");
const { FriendsDataModel } = require("../models/friendsData");
const { createToken } = require("../utils/createToken");

const signupService = async (name, email, password) => {
  const checkUserIsAlreadyExist = await UserModel.findOne({
    query: { email: email },
    projection: {},
  });
  if (checkUserIsAlreadyExist) {
    return {
      status: 422,
      data: {
        ok: false,
        msg: "user already exist",
      },
    };
  }
  const hashPassword = await bycrypt.hash(password, 10);
  const hashId = uuidv4();

  const newUser = new UserModel.UserModel({
    name,
    email,
    password: hashPassword,
    hashId,
    isDeleted: false,
  });
  const saveUser = await newUser.save();

  const newFriendsDataModel = await FriendsDataModel({
    userId: new ObjectId(saveUser._id),
    friends: [],
  });
  await newFriendsDataModel.save();

  if (saveUser) {
    return {
      status: 201,
      data: {
        ok: true,
        msg: "User has been successfully created!",
      },
    };
  }
};

const loginService = async (email, password) => {
  console.log(email, password);
  const checkUserExistOrNot = await UserModel.findOne({
    query: { email },
    projection: {},
  });

  if (!checkUserExistOrNot) {
    return {
      status: 422,
      data: {
        ok: false,
        msg: "User does not exist for this email!",
      },
    };
  } else {
    const isPassowrdMatch = await bycrypt.compare(
      password,
      checkUserExistOrNot.password
    );
    if (isPassowrdMatch) {
      const authToken = createToken(
        checkUserExistOrNot.email,
        checkUserExistOrNot._id
      );
      return {
        status: 200,
        data: {
          ok: true,
          userId: checkUserExistOrNot._id,
          email: checkUserExistOrNot.email,
          msg: "User has been successfully logged in!",
          name: checkUserExistOrNot.name,
          token: authToken,
        },
      };
    } else {
      return {
        status: 422,
        data: {
          ok: false,
          msg: "Invalid Password or email!",
        },
      };
    }
  }
};

module.exports = {
  signupService,
  loginService,
};
