const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    genreName: {
      type: String,
      required: true,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("genres", genreSchema);
