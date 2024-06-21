// importing packages/modules to use
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const sequelize = require("./config/connection");

// get express methods and connect to certain PORT with server
const app = express();
const PORT = process.env.PORT || 3001;

// set up the sessions and cookies
const sess = {
  secret: "super secret shh",
  cookie: {
    // declare to use cookies as medium to store session data
    maxAge: 60 * 60 * 1000, // expiry time for the cookies, good practice to not keep them long
    httpOnly: true, // only allow cookie transfer if protocol used is http
    secure: false, // not enforcing https, so no cookie transfers if https
    sameSite: "strict", // only allow cookie transfer if server is same as current URL
  },
  resave: false,
  saveUninitialized: false,
};

// Calling session constructor middleware
app.use(session(sess));

// Create the Handlebars.js engine object with custom helper functions
// const hbs = exphbs.create({ helpers });  likely not needed for this challenge

// Inform Express.js which template engine we're using
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// express middleware for converting data and serving static files to users
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// use modularized routing
app.use(routes);

// using sequelize for server listener
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
