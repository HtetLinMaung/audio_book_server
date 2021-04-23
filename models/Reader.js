const { Schema, model } = require("mongoose");

const readerSchema = new Schema(
  {
    profileImage: {
      type: String,
      required: true,
    },
    readerName: {
      type: String,
      required: true,
    },
    favoriteGenres: [
      {
        type: Schema.Types.ObjectId,
        ref: "genres",
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
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

module.exports = model("readers", readerSchema);
