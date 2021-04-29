const { Schema, model } = require("mongoose");

const currencySchema = new Schema(
  {
    currencyName: {
      type: String,
      required: true,
    },
    currencyCode: {
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

module.exports = model("currencies", currencySchema);
