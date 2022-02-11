//___________________
//Dependencies
//___________________
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
require("dotenv").config();
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);
console.log(MONGODB_URI);

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static("public"));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride("_method")); // allow POST, PUT and DELETE from a form

//___________________
// Routes
//___________________
//localhost:3000

/* -------------------------------------------------------------------------- */
/*                        GET ROUTES / SHOW PAGES                             */
/* -------------------------------------------------------------------------- */

//homepage
app.get("/home", (req, res) => {
  res.send("Hello World! The home page works!");
});

//pedals inventory page
app.get("/pedals/:id", (req, res) => {
  res.send("I'm the pedals page!");
});

//guitars inventory page

app.get("/guitars/:id", (req, res) => {
  res.send("I'm the guitars page!");
});

//amps inventory page

app.get("/amps/:id", (req, res) => {
  res.send("I'm the amps page!");
});

// new sale listingpage

app.get("/newSaleListing", (req, res) => {
  res.send("I'm the new sale listing page!");
});

// seller listings page
app.get("/sellerListings", (req, res) => {
  res.send("I'm the seller listings page!");
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log("Listening on port:", PORT));
