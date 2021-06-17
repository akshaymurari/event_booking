const bookings = require("../../databasesync/syncdb").bookings;

const db = require("../../databasesync/syncdb");

const book = async () => {
    const data = await bookings.findAll({

    });
    console.log(data);
    return data;
}

const createBooking = async (args) => {
    const data = await bookings.create({
        ...args.book,
    },
    );
    console.log(data);
    return data;
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

module.exports = {
    createBooking,
    book,
    cancelbooking
}