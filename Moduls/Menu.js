
const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String, // e.g., Starter, Main Course, Dessert
  image: String,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Menu', menuSchema);
