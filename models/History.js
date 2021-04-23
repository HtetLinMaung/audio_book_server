const { Schema, model } = require("mongoose");

const historySchema = new Schema(
  {
    readerId: {
      type: Schema.Types.ObjectId,
      ref: "readers",
      required: true,
    },
    bookmarks: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          ref: "books",
          required: true,
        },
        contentId: {
          type: Schema.Types.ObjectId,
          ref: "contents",
          required: true,
        },
        pageNo: {
          type: Number,
          required: true,
        },
      },
    ],
    currentReadings: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          ref: "books",
          required: true,
        },
        contentId: {
          type: Schema.Types.ObjectId,
          ref: "contents",
          required: true,
        },
        pageNo: {
          type: Number,
          required: true,
        },
        audioTime: {
          type: Number,
          default: null,
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

module.exports = model("histories", historySchema);
