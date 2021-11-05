const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
     name: {type: String, required: true},
     price: {type: Number, required: true}
});

const Product = mongoose.model("auth-product", productSchema);

module.exports = Product;