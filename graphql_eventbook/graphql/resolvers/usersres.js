const db = require("../../databasesync/syncdb");

const { Sequelize, DataTypes, Op } = require("sequelize");


const getusers = async () => {
    const data = await db.users.findAll({
      include:[db.events]
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