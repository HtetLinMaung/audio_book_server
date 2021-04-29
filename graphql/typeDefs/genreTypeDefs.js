const { gql } = require("apollo-server-express");

module.exports = gql`
  type Genre {
    _id: String!
    genreName: String!
    createdAt: String!
    updatedAt: String!
  }

  type GenreResponse implements MutationResponse {
    code: String!
    message: String!
    success: Boolean!
    genre: Genre
  }

  type GenreQueryResponse implements MutationResponse {
    code: String!
    message: String!
    success: Boolean!
    genres: [Genre]
  }

  extend type Query {
    genres: GenreQueryResponse!
    genre(id: String!): GenreResponse!
  }

  extend type Mutation {
    addGenre(genreName: String!): GenreResponse!
    updateGenre(id: String!, genreName: String!): GenreResponse!
    deleteGenre(id: String!): GenreResponse!
  }
`;
