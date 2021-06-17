const db = require("../../databasesync/syncdb");

const { Sequelize, DataTypes, Op } = require("sequelize");


const getusers = async () => {
    console.log("hello")
    const data = await db.users.findAll({
      include:[{
        model:db.events,
        attributes: [
            "id",
            "title",
            "description",
            "price"
        ],
      },{
        model:db.bookings
      }],

    });
    console.log(data);
    return data;
}

const createusers =  async (args) => {
    const data = await db.users.create({
      ...args.user
    });
    console.log(data);
    return data;
}

module.exports = {getusers, createusers};