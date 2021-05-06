const Currency = require("../../models/Currency");
const {
  InternalError,
  QueryResponse,
  NotFound,
  CreatedResponse,
  NoContent,
} = require("../constants");
const { createDto } = require("../utils/response-utils");

module.exports = {
  Query: {
    currencies: async () => {
      try {
        const currencies = await Currency.find({ deletedAt: null });

        return QueryResponse({
          currencies: currencies.map((v) => createDto(v)),
        });
      } catch (err) {
        return InternalError;
      }
    },
    currency: async (_, args) => {
      try {
        const currency = await Currency.findById(args.id);

        if (!currency) {
          return NotFound;
        }

        return QueryResponse({
          currency: createDto(currency),
        });
      } catch (err) {
        return InternalError;
      }
    },
  },
  Mutation: {
    addCurrency: async (_, args) => {
      try {
        const currency = new Currency(args);
        await currency.save();

        return CreatedResponse({ currency: createDto(currency) });
      } catch (err) {
        return InternalError;
      }
    },
    updateCurrency: async (_, args) => {
      try {
        const currency = await Currency.findById(args.id);

        if (!currency) {
          return NotFound;
        }

        currency.currencyName = args.currencyName;
        currency.currencyCode = args.currencyCode;
        await currency.save();

        return CreatedResponse({ code: "200", currency: createDto(currency) });
      } catch (err) {
        return InternalError;
      }
    },
    deleteCurrency: async (_, args) => {
      try {
        const currency = await Currency.findById(args.id);

        if (!currency) {
          return NotFound;
        }

        currency.deletedAt = new Date().toISOString();
        await currency.save();

        return NoContent;
      } catch (err) {
        return InternalError;
      }
    },
  },
};
