const mongoose = require('mongoose');
const { Schema } = mongoose;

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  dietary: {
    vegetarian: { type: Boolean, required: true },
    vegan: { type: Boolean, required: true },
    glutenFree: { type: Boolean, required: true },
  },
  amount: { type: String, required: false },
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
