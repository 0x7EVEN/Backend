const mongoose = require("mongoose");


const express = require("express");
const Product = require("../models/productModel");

const authenticate = require("../middleWare/authenticate");
const router = express.Router();


router.get("/", authenticate, async function(req, res) {
     try {
          const products = await Product.find().lean().exec();
          return res.send("success");
     } catch (err) {
          console.log(err);
          return res.send(err.message);
     }
});

module.exports = router;