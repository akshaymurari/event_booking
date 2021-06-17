const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize("eventsdb", "root", "akshaymurari", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {})
  .catch((error) => {
    console.log("db not authenticated");
  });

const db = {};

const events = require("../models/events")(sequelize, DataTypes);

const users = require("../models/users")(sequelize, DataTypes);

users.hasMany(events);

events.belongsTo(users);

db.users = users;

db.events = events;

sequelize
  .sync()
  .then(() => {
    console.log("sync table ");
  })
  .catch(() => {
    console.log("sync failed");
  });

module.exports = db;
