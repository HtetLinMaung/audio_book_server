const { gql } = require("apollo-server-express");

module.exports = gql`
  type Content {
    _id: String!
    text: String!
    createdAt: String!
    updatedAt: String!
  }
`;
