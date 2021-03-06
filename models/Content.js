const { Schema, model } = require("mongoose");

const contentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("contents", contentSchema);
