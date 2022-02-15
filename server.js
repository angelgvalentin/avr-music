//___________________
//Dependencies
//___________________
const { render } = require("ejs");
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const { Inventory } = require("./models/inventories");
const { Cart } = require("./models/inventories");
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

/* -------------------------------------------------------------------------- */
/*                             SIDE CART FUNTIONS                             */
/* -------------------------------------------------------------------------- */

const openSlideCart = () => {
  document.getElementById("side-cart").style.width = "250px";

  document.getElementById("main").style.marginLeft = "250px";
};

const closeSlideCart = () => {
  document.getElementById("side-cart").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
};

/* ----------------------- END OF SIDE CART FUNCTIONS ----------------------- */

let cartTotal = 0;
const cartSum = () => {
  cartTotal = Cart;
  console.log(Cart.find({ price: 199 }));
};
cartSum();

/* -------------------------------------------------------------------------- */
/*                             CART TOTAL FUNCTION                            */
/* -------------------------------------------------------------------------- */

//___________________
// Routes
//___________________
//localhost:3000

/* -------------------------------------------------------------------------- */
/*                        GET ROUTES / SHOW PAGES                             */
/* -------------------------------------------------------------------------- */

//homepage
app.get("/home", (req, res) => {
  Inventory.find(req.body, (err, allGear) => {
    res.render("home.ejs", {
      title: "Homepage",
      allGear,
    });
  });

  // res.send("Hello World! The home page works!");
});

//pedals inventory page
app.get("/pedals", (req, res) => {
  // res.send("I'm the pedals page!");

  Inventory.find({ category: "Pedal" }, (err, pedalList) => {
    res.render("pedals.ejs", {
      pedalList,
      title: "Pedals",
    });
  });
});

//guitars inventory page

app.get("/guitars", (req, res) => {
  // res.send("I'm the guitars page!");

  Inventory.find({ category: "Guitar" }, (err, guitarList) => {
    res.render("guitars.ejs", {
      guitarList,
      title: "Guitars",
    });
  });
});

//amps inventory page

app.get("/amps", (req, res) => {
  Inventory.find({ category: "Amp" }, (err, ampList) => {
    res.render("amps.ejs", {
      ampList,
      title: "Amps",
    });
  });
});

//gear Show  page
app.get("/gearShow/:id", (req, res) => {
  Inventory.findById(req.params.id, (err, gearShow) => {
    res.render("gearShow.ejs", {
      gearShow,
      title: "Gear Show",
    });
  });
});

// new sale listing page
app.get("/newSaleListing", (req, res) => {
  res.render("newSaleListing.ejs", {
    title: "Sell Your Gear",
  });
  // res.send("I'm the new sale listing page!");
});

app.get("/sellerListings", (req, res) => {
  // res.send("I'm the guitars page!");

  Inventory.find({ userListing: "userListing" }, (err, sellerList) => {
    res.render("sellerListings.ejs", {
      sellerList,
      title: "Seller Listings",
    });
  });
});

//edit Sale Listing Page
app.get("/editSale/:id", (req, res) => {
  Inventory.findById(req.params.id, (err, editedListing) => {
    res.render("editSale.ejs", {
      title: "Edit Sale",
      editedListing,
    });
  });
});

// //SIDE SLIDE SHOPPNIG CART
// app.get("/addToCart/", (req, res) => {
//   Inventory.find(req.body, (err, cartGear) => {
//     res.render("./partials/shoppingCart.ejs", {
//       cartGear,
//     });
//   });
//   // res.send("Hello World! The home page works!");
// });

/* -------------------------------------------------------------------------- */
/*                                POST ROUTES                                 */
/* -------------------------------------------------------------------------- */

//new seller listing
app.post("/home", (req, res) => {
  Inventory.create(req.body, (err, newListing) => {
    console.log("created new listing");
    res.redirect("/home");
  });
});

app.post("/pedals");

app.post("/guitars");

app.post("/amps");

//add to cart after side cart fail
app.get("/cart", (req, res) => {
  Cart.find(req.body, (err, itemsInCart) => {
    res.render("cart.ejs", {
      title: "Shopping Cart",
      itemsInCart,
      cartTotal,
    });
  });
});

// submit form to add item to cart
app.post("/cart/add/:id", async (req, res) => {
  console.log("pokemon added to team");
  const id = req.params.id;
  const addedGear = await Inventory.findById(id);
  await Cart.insertMany([addedGear]);
  res.redirect("/cart");
});

// //add to cart route
// app.post("/addToCart/:id", (req, res) => {
//   Inventory.findById(req.params.id, (err, addedItem) => {
//     console.log("item added to list");
//   });
// });

/* -------------------------------------------------------------------------- */
/*                                 PUT ROUTES                                 */
/* -------------------------------------------------------------------------- */

app.put("/editSale/:id", (req, res) => {
  Inventory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, listingUpdateInfo) => {
      res.redirect("/sellerListings");
    }
  );
});

/* -------------------------------------------------------------------------- */
/*                                DELETE ROUTES                               */
/* -------------------------------------------------------------------------- */

app.delete("/home/:id", (req, res) => {
  console.log("before mongoose Deleting listing");
  Inventory.findByIdAndRemove(req.params.id, (err, removedListing) => {
    res.redirect("/sellerListings");
  });
});

app.delete("/cart/remove/:id", (req, res) => {
  console.log("before mongoose Deleting listing");
  Cart.findByIdAndRemove(req.params.id, (err, removeditem) => {
    res.redirect("/cart");
  });
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log("Listening on port:", PORT));
