const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");


const app = express();   //require("")

const userSchema = new mongoose.Schema({
     name: {type: String, required: true},
     email: {type: String, required: true},
     password: {type: String, required: true}
}, {
     versionKey: false,
     timestamps: true
});

userSchema.pre("save", function(next) {
     if (!this.isModified("password")) return next();
     const hash = bcrypt.hashSync(this.password, 8);
     this.password = hash;
     return next();
});

userSchema.methods.matchPassword = function(password) {
     return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("auth", userSchema);