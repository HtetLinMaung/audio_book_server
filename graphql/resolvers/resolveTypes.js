module.exports = {
  MutationResponse: {
    __resolveType: (res, context, info) => {
      if (res.book) {
        return "BookResponse";
      }
      if (res.genre) {
        return "GenreResponse";
      }
      if (res.genres) {
        return "GenreQueryResponse";
      }
      if (res.currencies) {
        return "CurrencyQueryResponse";
      }
      if (res.books) {
        return "BookQueryResponse";
      }
      if (res.currency) {
        return "CurrencyResponse";
      }
    },
  },
};
