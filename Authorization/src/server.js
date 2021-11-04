const mongooes = require("mongoose");

const express = require("express");

const app = express();
const connect = require("./configs/db");
app.use(express.json());

const {register, login} = require("./controllers/user.controller");
const postController = require("./controllers/postController");
app.use("/register", register);
app.use("/login", login);

app.use("/posts", postController);

app.listen(8080, async () => {
     try {
          await connect();
          console.log("listening on port 8080");
     } catch (err) {
          console.log(err);
     }
});