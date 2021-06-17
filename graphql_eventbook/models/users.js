const events = require("./events");

module.exports = (sequelize,DataTypes) => {
    const users = sequelize.define("user",{
        username:{
            primaryKey:true,
            type:DataTypes.STRING,
            required:true
        },
        password:{
            type:DataTypes.STRING,
            required:true
        }
    });
    return users;
}

