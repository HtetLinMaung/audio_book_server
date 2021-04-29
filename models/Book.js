const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    bookName: {
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
    chapters: [
      {
        chapterTitle: {
          type: String,
          required: true,
        },
        pages: [
          {
            pageNo: {
              type: Number,
              required: true,
            },
            duration: {
              type: Number,
              default: 0,
            },
            content: {
              type: Schema.Types.ObjectId,
              required: true,
              ref: "contents",
            },
          },
        ],
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
    currency: {
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
