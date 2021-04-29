const Currency = require("../../models/Currency");

module.exports = {
  Query: {
    currencies: async () => {
      return await Currency.find();
    },
  },
};
