const mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");

const User = require("../model/user.model");
const router = express.Router();

const upload = require("../utils/uploader");

router.get("/", async function(req, res) {
     try {
          const users = await User.find().lean().exec();
          return res.status(200).json({users});
     } catch (err) {
          console.log(err);
          return res.send(err.message);
     }
});

// router.post("/single", upload.single("profile_pic"), async function(req, res) {
//      try {
//           const user = await User.create(req.body);
//           return res.status(201).json({user});
//      } catch (err) {
//           return res.send(err.message);
//      }
// });


// router.post("/multiple", upload.any("profile_pic"), async function(req, res) {
//      const filePath = req.files.map((file) => file.path);
//      try {
//           const user = await User.create({
//                first_name: req.body.first_name,
//                last_name: req.body.last_name,
//                profile_pics: filePath
//           });
//           return res.status(201).json({user});
//      } catch (err) {
//           filePath.map((path) => fs.unlinkSync(path));
//           return res.send(err.message);
//      }
// });




module.exports = router;