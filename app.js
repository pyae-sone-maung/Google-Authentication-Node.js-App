const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const oAuthRoute = require("./src/router/google-auth-router");

app.use(express.static("./public"));
app.set("view engine", "ejs");

app.use(cors());
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", oAuthRoute); // use this line at bottom for authenticated middleware

module.exports = app;
