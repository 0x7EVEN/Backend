const mongoose = require("mongoose");

// const app = require("app");


function connect () {
     return mongoose.connect("mongodb://127.0.0.1:27017/auth");
}

module.exports = connect;
