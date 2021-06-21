const express = require("express");

const async = require("async");

const router = express.Router();

const db = require("../../databasesync/syncdb"); 

const getusers = async () => {
    const result = await db.users.findAll({

        raw:true
    });
    return result;
} 

const getbookings = async () => {
    const result = await db.bookings.findAll({
        raw:true
    });
    return result;
} 

const getevents = async () => {
    const result = await db.events.findAll({
        raw:true
    });
    return result;
} 

router.get("/getallinasync",(req,res)=>{
    console.log("hello")
    // res.send("all");
    async.parallel([
        getusers,
        getevents,
        getbookings
    ],function(error,result){
        console.log("error ",error);
        console.log("result ",result);
        res.send(result);
    });
});

module.exports = router;