const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const Ingredient = require('../db/models/Ingredient');

mongoose.connect(MONGO_URI);

const resolvers = {
  Query: {
    ingredient: async (_, { _id }) => {
      return await Ingredient.findById({ _id }).lean();

      return ingredient;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

const PORT = process.env.PORT || 6969;

server.start({ port: PORT }, () => console.log(`Server is running on ${PORT}`));
