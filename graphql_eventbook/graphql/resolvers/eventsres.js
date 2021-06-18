const db = require("../../databasesync/syncdb");

const createevents = async (args) => {
    console.log(args);
    const token = args.event.token;
    args.event["token"]=undefined;
    if(require("./auth")(token)){
      const data = await db.events.create({
        ...args.event,
      });
      console.log(data.dataValues);
      return data.dataValues;
    }else{
      throw new Error("invalid user");
    }
}

const getevents = async () => {
    const data = await db.events.findAll({
    });
    console.log(data);
    return data;
}

module.exports = {createevents,getevents};