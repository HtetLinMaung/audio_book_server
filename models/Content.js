const { Schema, model } = require("mongoose");

const contentSchema = new Schema(
  {
    contentTitle: {
      type: String,
      required: true,
    },
    body: [
      {
        pageNo: {
          type: Number,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        duration: {
          type: Number,
          default: 0,
        },
      },
    ],
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
