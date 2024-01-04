const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");
const pino = require("express-pino-logger")();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(pino);
app.use(cors());

console.log(`Your port is ${process.env.PORT}`);

app.use(passport.initialize());
//Passport config
require("./config/passport")(passport);

//Routes
const users = require("./routes/api/users");
app.use("/api/users", users);
const utility = require("./routes/api/utility");
app.use("/api/utility", utility);
const shift = require("./routes/api/shift");
app.use("/api/shift", shift);
const category = require("./routes/api/category");
app.use("/api/category", category);
const quiz = require("./routes/api/quiz");
app.use("/api/quiz",quiz);


const modules = require("./routes/api/modules");
app.use("/api/modules", modules);

module.exports = app;
