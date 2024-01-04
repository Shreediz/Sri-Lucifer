const nodemailer = require("nodemailer");
const mailConfig = {
  service: "gmail",
  //TODO : Change to secure :TRUE
  secure: false,
  port: 25,
  auth: {
    user: "thisisjustdummysaurav@gmail.com",
    pass: "TestNepalAdhikari22-"
  },
  tls: {
    rejectUnauthorized: false
  }
};
const transporter = nodemailer.createTransport(mailConfig);

module.exports = transporter;
