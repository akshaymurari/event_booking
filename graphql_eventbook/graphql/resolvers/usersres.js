const db = require("../../databasesync/syncdb");

const { Sequelize, DataTypes, Op } = require("sequelize");

const jwt = require("jsonwebtoken");

const DataLoader = require('dataloader')

const linksLoader = new DataLoader(async ele=>{
  console.log(ele.userUsername);
  const result = await db.users.findAll({
    where:{
      username:{
        [Op.in]:ele.userUsername
      }
    },
    raw:true
  });
  console.log("result in data loader")
  console.log(result);
  return result;
})

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
  console.log({...args.login})
  const token = await jwt.sign({...args.login},process.env.secret_key);
  if(data){
    return {
      token,
      username:args.login.username
    }
  }else{
    throw new Error("user not found");
  }
}

const link = async () => {
  try{
    const links = await db.links.findAll({
      raw:true
    });
    console.log(links);
    links.map((ele)=>{
      console.log(ele);
      linksLoader.load(ele).then((res)=>{
        console.log("final data",res)
      });
     });
  }
  catch(error){
    console.log(error);
  }

}

module.exports = {getusers, createusers,login,link};