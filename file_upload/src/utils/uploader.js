const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
     destination: function(req, file, callback) {
          callback(null, path.join(__dirname, "../uploads"));
     },
     filename: function(req, file, callback) {
          callback(null, Date.now() + file.originalname);
     }
});

function fileFilter (req, file, callback) {
     if (file.mimetype === "image/jpeg" || file.mimetype === "imgage/png") {
          callback(null, true);
     } else {
          callback(null, false);
     }
};


const uplaod = multer({
     storage: storage,
     limits: {
          fileSize: 1024 * 1024 * 10
     },
     fileFilter: fileFilter
});

module.exports = uplaod;