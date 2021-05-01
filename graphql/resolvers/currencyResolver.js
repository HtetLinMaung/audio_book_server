const Currency = require("../../models/Currency");
const { InternalError, QueryResponse } = require("../constants");
const { createDto } = require("../utils/response-utils");

module.exports = {
  Query: {
    currencies: async () => {
      try {
        const currencies = await Currency.find();

        return QueryResponse({
          currencies: currencies.map((v) => createDto(v)),
        });
      } catch (err) {
        return InternalError;
      }
    },
  },
};
