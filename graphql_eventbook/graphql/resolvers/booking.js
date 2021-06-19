const bookings = require("../../databasesync/syncdb").bookings;

const db = require("../../databasesync/syncdb");

const book = async () => {
    const data = await bookings.findAll({

    });
    console.log(data);
    return data;
}

const createBooking = async (args) => {
    const token = args.book.token;
    if(require("./auth")(token)){        
        args["token"]=undefined;
        const data = await bookings.create({
            ...args.book,
        });
        console.log(data);
        return data;
    }
    else{
        throw new Error("invalid user");
    }
}

const cancelbooking = async (args) => {
    try{        
        const data = await bookings.destroy({
            where:{
                ...args.cancel
            }
        });
        console.log(data);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }

}

const getmybookings = async (args) => {
    console.log(args);
    const user = require("./auth")(args.token);
    console.log(user);
    if(user){
        const result = await db.bookings.findAll({
            where:{
                userUsername:user.username
            },
            attributes:["id"],
            raw: true,
            nest: true
            ,
            include:[{
                model:db.events,
                attributes:[["userUsername","owner"],"title","date","description","id"],
            }],
        });
        const data = result;
        console.log(data);
        return data
    }else{
        throw new Error("invalid token");
    }
}

module.exports = {
    createBooking,
    book,
    cancelbooking,
    getmybookings
}