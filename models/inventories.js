const mongoose = require("mongoose");

const gearSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  video: { type: String, required: true },
  userListing: { type: String, required: false },
});

const Inventory = mongoose.model("Inventory", gearSchema);
const Cart = mongoose.model("Cart", gearSchema);

module.exports = {
  Inventory,
  Cart,
};
