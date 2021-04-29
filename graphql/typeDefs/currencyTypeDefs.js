const { gql } = require("apollo-server-express");

module.exports = gql`
  type Currency {
    _id: String!
    currencyName: String!
    currencyCode: String!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    currencies: [Currency]
  }
`;
