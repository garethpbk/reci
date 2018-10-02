const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const Ingredient = require('../db/models/Ingredient');

mongoose.connect(MONGO_URI);

const resolvers = {
  Query: {
    ingredients: async () => {
      const ingredients = await Ingredient.find().lean();
      //console.log(ingredients);

      const allIngredients = ingredients.map(ingredient => {
        const { name, calories, dietary } = ingredient;
        return {
          name,
          calories,
          dietary,
        };
      });

      console.log(allIngredients);

      return { ingredients: allIngredients };
    },

    ingredient: async (_, { _id }) => {
      const ingredient = await Ingredient.findById({ _id }).lean();

      console.log(ingredient);

      return ingredient;
    },
  },

  Mutation: {
    createIngredient: async (_, args) => {
      const newIngredient = new Ingredient(args);

      newIngredient.save();

      return newIngredient;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

const PORT = process.env.PORT || 6969;

server.start({ port: PORT }, () => console.log(`Server is running on ${PORT}`));
