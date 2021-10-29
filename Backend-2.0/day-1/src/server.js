require("dotenv").config();

const express = require("express");
const connect = require("./config/db");

const app = express();

app.use(express.json());

const userController = require("./controllers/userController");


app.use("/users", userController);


app.listen(8080, async () => {
     await connect();
     console.log("Listening to port 8080");
});