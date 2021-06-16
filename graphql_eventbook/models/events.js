module.exports = (sequelize,DataTypes) => {
    return sequelize.define("event",{
        title:{
            type:DataTypes.STRING,
            required:true
        },
        description:{
            type:DataTypes.STRING,
            required:true
        },
        price:{
            type:DataTypes.FLOAT,
            required:true
        },
        date:{
            type:DataTypes.STRING,
            required:true
        }
    },{
        timestamps:false
    })
}