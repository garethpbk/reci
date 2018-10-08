const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const Ingredient = require('../db/models/Ingredient');
const Recipe = require('../db/models/Recipe');

mongoose.connect(MONGO_URI);

const resolvers = {
  Query: {
    ingredients: async () => {
      const ingredients = await Ingredient.find().lean();
      //console.log(ingredients);

      const allIngredients = ingredients.map(ingredient => {
        const { name, calories, dietary, _id } = ingredient;
        return {
          _id,
          name,
          calories,
          dietary,
        };
      });

      return allIngredients;
    },

    ingredient: async (_, { _id }) => {
      const ingredient = await Ingredient.findById({ _id }).lean();

      return ingredient;
    },

    recipes: async () => {
      const recipes = await Recipe.find().lean();

      const allRecipes = recipes.map(recipe => {
        const { name, description, category, dietary, _id, ingredients } = recipe;
        return {
          _id,
          name,
          description,
          category,
          dietary,
          ingredients,
        };
      });

      return allRecipes;
    },

    recipe: async (_, { _id }) => {
      const recipe = await Recipe.findById({ _id }).lean();

      return recipe;
    },
  },

  Mutation: {
    createIngredient: async (_, args) => {
      const newIngredient = new Ingredient(args);

      newIngredient.save();

      return newIngredient;
    },

    deleteIngredient: async (_, { _id }) => {
      const ingredientToDelete = await Ingredient.findByIdAndRemove({ _id });

      return ingredientToDelete;
    },

    updateIngredient: async (_, args) => {
      const { _id } = args;

      const ingredientToUpdate = await Ingredient.findByIdAndUpdate({ _id }, { $set: args });

      return ingredientToUpdate;
    },

    createRecipe: async (_, args) => {
      const newRecipe = new Recipe(args);

      const { ingredients } = args;
      const ingredientsToAdd = [];

      const recipeIngredients = await Promise.all(
        ingredients.map(async ingredient => {
          const { _id } = ingredient;

          const foundIngredient = await Ingredient.findById({ _id });

          ingredientsToAdd.push(foundIngredient);

          return foundIngredient;
        })
      ).then(() => (newRecipe.ingredients = [...ingredientsToAdd]));

      console.log(newRecipe);

      newRecipe.save();

      return newRecipe;
    },

    deleteRecipe: async (_, { _id }) => {
      const recipeToDelete = await Recipe.findByIdAndRemove({ _id });

      return recipeToDelete;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

const PORT = process.env.PORT || 6969;

server.start({ port: PORT }, () => console.log(`Server is running on ${PORT}`));
