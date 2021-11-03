const express = require("express");

const connect = require("../src/configs/db");

const app = express();
const userController = require("./controllers/user.controllers");

app.use(express.json());

app.use("/users", userController);

app.listen(8080, () => {
     connect();
     console.log("listening on port 8080");
});