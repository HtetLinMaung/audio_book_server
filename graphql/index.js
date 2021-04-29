const _ = require("lodash");
const bookResolver = require("./resolvers/bookResolver");
const currencyResolver = require("./resolvers/currencyResolver");
const genreResolver = require("./resolvers/genreResolver");
const resolveTypes = require("./resolvers/resolveTypes");
const baseTypeDefs = require("./typeDefs/baseTypeDefs");
const bookTypeDefs = require("./typeDefs/bookTypeDefs");
const contentTypeDefs = require("./typeDefs/contentTypeDefs");
const currencyTypeDefs = require("./typeDefs/currencyTypeDefs");
const genreTypeDefs = require("./typeDefs/genreTypeDefs");

module.exports = {
  typeDefs: [
    baseTypeDefs,
    bookTypeDefs,
    contentTypeDefs,
    currencyTypeDefs,
    genreTypeDefs,
  ],
  resolvers: _.merge(
    {},
    resolveTypes,
    bookResolver,
    currencyResolver,
    genreResolver
  ),
};
