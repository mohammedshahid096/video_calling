const mongoose = require("mongoose");
const { user, activeUsers } = require("../../constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
      required: true,
    },
    isOnline: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const activeUsersModel = mongoose.model(activeUsers, ModelSchema);

module.exports = activeUsersModel;
