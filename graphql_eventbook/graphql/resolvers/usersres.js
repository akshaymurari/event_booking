const db = require("../../databasesync/syncdb");

const { Sequelize, DataTypes, Op } = require("sequelize");

const jwt = require("jsonwebtoken");

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
  try{
    const data = await db.users.create({
      ...args.user
    });
    console.log(data);
    const token = await jwt.sign({...args.user},process.env.secret_key);
    console.log(token);
    console.log(args.user.username);
   return {
      token,
      username:args.user.username
    }; 
  }catch(error){
    console.log(error);
    throw new Error("cannot create user username already exists");
  }
}

const login = async (args) => {
  const data = await db.users.findOne({
    where:{
      ...args.login
    }
  });
  console.log(data);
  const token = await jwt.sign({...args.user},process.env.secret_key);
  if(data){
    return {
      token,
      username:args.login.username
    }
  }else{
    throw new Error("user not found");
  }
}

module.exports = {getusers, createusers,login};