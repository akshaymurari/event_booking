module.exports = (sequelize) => {
    return sequelize.define("bookings",()=>{
    },{
        timestamps:false
    });
}