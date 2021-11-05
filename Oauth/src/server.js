const mongooes = require("mongoose");

const express = require("express");

const app = express();
const connect = require("./configs/db");
app.use(express.json());
const passport = require("./configs/passport");
app.use(passport.initialize());

const {register, login} = require("./controllers/user.controller");
const postController = require("./controllers/productController");
app.use("/register", register);
app.use("/login", login);

app.use("/posts", postController);
function checker (next) {
     console.log("succcesss--------------->>");
     return next();
}
passport.serializeUser(function(user, done) {
     console.log("inside serilizer");
     done(null, user);

});

passport.deserializeUser(function(user, done) {
     console.log("inside deserilizer");
     done(null, user);
});

app.get("/Auth/google",
     passport.authenticate("google", {scope: ["email", "profile"]})
);

app.get("/Auth/google/callback", passport.authenticate("google", {
     successRedirect: "/auth/google/success",
     failureRedirect: "auth/google/failure"
}));

app.listen(3333, async () => {
     try {
          await connect();
          console.log("listening on port 3333");
     } catch (err) {
          console.log(err);
     }
});