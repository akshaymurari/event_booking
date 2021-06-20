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
db.bookings = require("../models/bookings")(sequelize);

db.links = require("../models/link")(sequelize, DataTypes);

users.hasMany(events);

events.belongsTo(users);

db.users = users;
db.events = events;

db.users.hasMany(db.bookings);

db.events.hasMany(db.bookings);

db.bookings.belongsTo(users);

db.bookings.belongsTo(events);

db.users.hasMany(db.links);

db.links.belongsTo(db.users);

sequelize
  .sync()
  .then(() => {
    console.log("sync table ");
  })
  .catch(() => {
    console.log("sync failed");
});

module.exports = db;
