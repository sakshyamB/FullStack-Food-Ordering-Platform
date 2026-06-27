const mongoose = require('momgoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  Category: {
    type: String,
    enum: ["Breakfast", "Main", "Soup", "Dessert", "Snacks", "Drinks", "Salads"],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["veg", "non-veg"],
    required: true
  }
});

module.exports = mongoose.model('Users', userSchema);