const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "genres",
      },
    ],
    bookType: {
      type: String,
      enum: ["audiobook", "ebook"],
      required: true,
    },
    contents: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "contents",
      },
    ],
    audioUrl: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: true,
    },
    currencyId: {
      type: Schema.Types.ObjectId,
      ref: "currencies",
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

module.exports = model("books", bookSchema);
