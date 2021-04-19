require("dotenv").config();

const cors = require("cors");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const PORT = process.env.PORT || 3000;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
