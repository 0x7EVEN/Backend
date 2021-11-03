const express = require("express");

const router = express.Router();

const upload = require("../utils/uploader");


const Gallery = require("../model/gallery.model");
const User = require("../model/user.model");
router.get("/", async function(req, res) {
     try {
          const gallery = await Gallery.find().lean().exec();
          return res.send(gallery);
     } catch (err) {
          console.log(err);
          return err.message;
     }
});


router.post("/:id", upload.any("profile_pic"), async function(req, res) {
     const id = req.params.id;
     try {
          const user = await User.findById(id);
          console.log("user", user);
          const picPaths = req.files.map((pic) => pic.path);
          if (user) {
               const gallery = await Gallery.create({
                    ...user,
                    profile_pic: picPaths
               });
               return res.send(gallery);
          } else {
               return res.send("User not found !");
          }
     } catch (err) {
          console.log('err:', err);
          return res.send(err.message);
     }
});
