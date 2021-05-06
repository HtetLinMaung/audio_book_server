const { gql } = require("apollo-server-express");

module.exports = gql`
  enum BookTypes {
    audiobook
    ebook
  }

  type BookResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    book: Book
  }

  type BookQueryResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    total: Int!
    perPage: Int!
    currentPage: Int!
    lastPage: Int!
    from: Int!
    to: Int!
    books: [Book]
  }

  type Page {
    pageNo: Int!
    duration: Float!
    content: Content!
  }

  type Chapter {
    chapterTitle: String!
    pages: [Page]
  }

  type Book {
    _id: String!
    bookName: String!
    authorName: String!
    coverImage: String!
    genres: [Genre]
    bookType: BookTypes!
    chapters: [Chapter]
    audioUrl: String!
    price: Float!
    currency: Currency!
    createdAt: String!
    updatedAt: String!
  }

  input PageInput {
    pageNo: Int!
    duration: Float
    content: String!
  }

  input ChapterInput {
    chapterTitle: String!
    pages: [PageInput]
  }

  input BookInput {
    id: String
    bookName: String!
    authorName: String!
    coverImage: String!
    genres: [String]
    bookType: BookTypes!
    chapters: [ChapterInput]
    audioUrl: String!
    price: Float!
    currency: String!
  }

  extend type Query {
    books(page: Int!, perPage: Int!): BookQueryResponse!
    book(id: String!): BookResponse!
  }

  extend type Mutation {
    addBook(bookInput: BookInput!): BookResponse!
    updateBook(bookInput: BookInput!): BookResponse!
    deleteBook(id: String!): BookResponse!
  }
`;
