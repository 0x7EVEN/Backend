
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const newToken = (user) => {
     try {
          return jwt.sign({user: user}, "secretKey");//to be replaced by env var}.
     } catch (err) {
          console.log(err.message);
     }
};



async function register (req, res) {
     // if user already there then we will throw error
     try {
          let user = await User.findOne({email: req.body.email}).lean().exec();

          if (user) return res.send("user already exist");

          user = await User.create(req.body);

          const token = newToken(user);

          res.send({user, token});
     } catch (err) {
          console.log(err);
     }
}

async function login (req, res) {
     let user = User.findOne({email: req.body.email});
     if (!user) {
          return res.send("user not found !");
     }

     const match = user.matchPassword(req.body.password);

     if (!match) {
          return res.send("wrong password");
     }

     const token = newToken(user);
}

module.exports = {register, login};