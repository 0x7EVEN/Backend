const mongoose = require("mongoose");
const express = require("express");

// ...rest of the initial code omitted for simplicity.
const {body, validationResult} = require('express-validator');

const app = express();

app.use(express.json());


const connect = () => mongoose.connect('mongodb://127.0.0.1:27017/web10Validation');

const userSchema = mongoose.Schema({
     first_name: {type: String, required: true},
     last_name: {type: String, required: true},
     email: {type: String, required: true},
     pincode: {type: Number, required: true},
     age: {type: Number, required: true},
     gender: {type: String, required: true},
});

const User = mongoose.model("user", userSchema);

app.get('/', async function(req, res) {
     try {
          const users = await User.find().lean().exec();
          return res.send(users);
     } catch (err) {
          return res.send(err.message);
     }
});

app.post("/"
     , body("first_name").notEmpty().withMessage("first_name is required")
     , body("last_name").notEmpty().withMessage("last_name is required")
     , body("email").notEmpty().withMessage("email is required").isEmail().withMessage("email is incorrect")
     , body("pincode").notEmpty().withMessage("pincode is required").isLength({min: 5, max: 6}).withMessage("Invalid pincode")
     , body("age").notEmpty().withMessage("age is required").custom((age) => {
          if (age >= 1 && age <= 100) {
               return true;
          } else {
               throw new Error("please provide valid age");
          }
     }), body("gender").notEmpty().withMessage("gender is required").custom((gender) => {
          if (gender.toLowerCase() === "male" || gender.toLowerCase() === "female" || gender.toLowerCase() === "others") {
               return true;
          } else {
               throw new Error("gender is invalid");
          }
     }), async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.send(errors);
          }
          res.send("Thank you");
     });



app.listen(8080, async () => {
     await connect();
     console.log("listening on port 8080");
});
