const mongoose = require("mongoose");
const siteInventory = require("./models/siteStarterInfo");
const inventories = require("./models/inventories");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
// console.log(MONGODB_URI);

const seedDatabase = async () => {
  // connect to database
  await mongoose.connect(MONGODB_URI);
  console.log("connected to Atlas Database");

  // clear any previous data
  await inventories.Inventory.deleteMany({});
  await inventories.Inventory.find().then((gear) =>
    console.log("previous inventory data reset: " + (gear.length === 0))
  );
  // await pokemon.MyTeam.deleteMany({});
  // await pokemon.MyTeam.find().then((pk) =>
  //   console.log("previous team data reset: " + (pk.length === 0))
  // );

  // insert all  inventory starter gear into Inventory collection
  await inventories.Inventory.insertMany(siteInventory);
  await inventories.Inventory.find().then((gear) =>
    console.log("Starter inventory is in DB " + gear.length)
  );

  // // insert Charmander to our starting team
  // const charmander = pokedata.find((pokemon) => pokemon.name === "Charmander");
  // await pokemon.MyTeam.insertMany([charmander]);
  // await pokemon.MyTeam.findOne().then((pk) =>
  //   console.log("Charmander is in your team: " + (pk.name === "Charmander"))
  // );

  await mongoose.disconnect();
  console.log("mongoose disconnected");
};

seedDatabase().catch((err) => console.log(err));
