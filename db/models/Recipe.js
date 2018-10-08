const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array, required: false },
  category: { type: String, required: true },
  dietary: {
    vegetarian: { type: Boolean, required: true },
    vegan: { type: Boolean, required: true },
    glutenFree: { type: Boolean, required: true },
  },
  ingredients: { type: Array, required: true },
  partials: { type: Array, required: false },
  steps: { type: Array, required: true },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
