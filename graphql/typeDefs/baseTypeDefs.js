const { gql } = require("apollo-server-express");

module.exports = gql`
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Query

  type Mutation
`;
