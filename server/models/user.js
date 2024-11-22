const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserModel = mongoose.model(
  "user",
  new Schema(
    {
      name: {
        type: String,
        require: true,
      },
      hashId: {
        type: String,
        required: true,
      },
      isDeleted: {
        type: Boolean,
        required: true,
      },
      email: {
        type: String,
        require: true,
      },
      password: {
        type: String,
        require: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = {
  UserModel,
  findOne: async ({ query, projection }) =>
    UserModel.findOne(query, projection).lean(),
  find: async ({ query, projection }) =>
    UserModel.find(query, projection).lean(),
  updateOne: async ({ query, updateDict }) =>
    UserModel.updateOne(query, updateDict),
};
