const { gql } = require("apollo-server-express");

module.exports = gql`
  type Currency {
    _id: String!
    currencyName: String!
    currencyCode: String!
    createdAt: String!
    updatedAt: String!
  }

  type CurrencyQueryResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    currencies: [Currency]
  }

  type CurrencyResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    currency: Currency
  }

  extend type Query {
    currencies: CurrencyQueryResponse
    currency(id: String!): CurrencyResponse
  }

  extend type Mutation {
    addCurrency(currencyName: String!, currencyCode: String!): CurrencyResponse!
    updateCurrency(
      id: String!
      currencyName: String!
      currencyCode: String!
    ): CurrencyResponse!
    deleteCurrency(id: String!): CurrencyResponse!
  }
`;
