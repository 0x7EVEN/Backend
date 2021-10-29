const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
     host: "smtp.mailtrap.io",
     port: 587,
     secure: false, // true for 465, false for other ports
     auth: {
          user: process.env.SMTP_USERNAME, // generated ethereal user
          pass: process.env.SMTP_PASSWORD   // generated ethereal password
     },
});

async function mailer (name, mail) {
     console.log("request to user with", name, mail);
     await transporter.sendMail(
          {
               from: '"arif" <0x7EVEN@masaii.com>', // sender address
               to: mail === "admins" ? "admin1,admin2,admin3,admin4,..." : mail,
               subject: "Hello " + name + " welcome to assignment !", // Subject line
               text: "Hello " + name + " welcome to assignment !", // plain text body
               html: "<b>Hello " + name + " </b>", // html body
          });

};
async function adminMailer (name) {
     console.log("request to admin with", name);
     await transporter.sendMail({
          from: "system <system@managment.com>",
          to: "<admin1@company.com>, <admin2@company.com>, <admin3@company.com>, <admin4@company.com>, <admin5@company.com>",
          subject: "Hello admins please welcome " + name, // Subject line
          text: "Hello admins welcome " + name, // plain text body
          html: "<b>Hello admins welcome " + name + " </b>", // html body
     });
};
module.exports = {mailer, adminMailer};