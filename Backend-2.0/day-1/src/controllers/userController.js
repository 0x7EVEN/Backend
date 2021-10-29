
const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();
const User = require("../models/userModel");

const {mailer, adminMailer} = require("../config/mail");

router.get("/", async (req, res) => {
     try {
          const page = Number(req.query.page) || 1;
          const size = Number(req.query.size) || 10;
          const offest = (page - 1) * size;

          const users = await User.find().skip(offest).limit(size).lean().exec();
          const totalPages = Math.ceil(await User.find().countDocuments());
          res.status(200).json({users, totalPages});
     }
     catch (err) {
          console.log(err);
          res.send(err);
     }
});
router.post("/", async (req, res) => {
     console.log("request with", req.body);
     /**
      * requred proper request with mail,name,age
      *
     */
     try {
          console.log("--- inside userController post ---");
          const user = await User.create(req.body);
          console.log(process.env.SMTP_USERNAME, process.env.SMTP_PASSWORD);


          mailer(req.body.first_name, req.body.email);
          adminMailer(req.body.first_name);

          res.send(user);
     } catch (err) {
          console.log(err);
          res.send(err.message);
     }
});
module.exports = router;