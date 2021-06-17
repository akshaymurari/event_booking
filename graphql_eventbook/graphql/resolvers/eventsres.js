const db = require("../../databasesync/syncdb");

const createevents = async (args) => {
    const data = await db.events.create({
      ...args.event 
    });
    console.log(data.dataValues);
  return data.dataValues;
}

const getevents = async () => {
    const data = await db.events.findAll({});
    console.log(data);
    return data;
}

module.exports = {createevents,getevents};