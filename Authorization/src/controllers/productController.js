const mongoose = require("mongoose");


const express = require("express");
const Product = require("../models/productModel");


const router = express.Router();


router.get("/", async function(req, res) {
     try {
          const products = await Product.find().lean().exec();

          return res.send(products);
     } catch (err) {
          console.log(err);
          return res.send(err.message);
     }
});

module.exports = router;