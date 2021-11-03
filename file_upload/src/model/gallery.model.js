const mongoose = require("mongoose");
const {schema} = require("./user.model");

const gallerySchema = new mongoose.Schema({
     userId: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
     img_urls: [{type: String}]
});


module.exports = mongoose.model("gallery", gallerySchema);