const {getusers,createusers,login,link} = require("./usersres");

const {getevents,createevents} = require("./eventsres");

const bookingres = require("./booking");

const async = require("async");

const db = require("../../databasesync/syncdb");

const getusers1 = async () => {
    const result = await db.users.findAll({
        attributes:["username","password"],
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

const getevents1 = async () => {
    const result = await db.events.findAll({
        raw:true
    });
    return result;
} 


module.exports = {
    user : getusers,
    link:link,
    event: getevents,
    create: createevents,
    createUser: createusers,
    login:login,
    ...bookingres,
    all:function(){
        return {
            users: [
              { username: 'akshay', password: 'akshay' },
              { username: 'akshaymurari', password: 'akshay' }
            ],
            events: [
              {
                id: 15,
                title: 'new',
                description: 'hello',
                price: 10,
                date: '2021-06-19 18:50:52',
                userUsername: 'akshaymurari'
              }
            ],
            bookings: [ { id: 8, userUsername: 'akshaymurari', eventId: 15 } ]
          }
    },
    getallinasync:async function(){
        try{
            let result=[];
            console.log("hello")
            // res.send("all");
            let val;
            val = await getusers1();
            result.push(val);
            val = await getevents1();
            result.push(val);
            val = await getbookings();
            result.push(val);
            // result = await Promise.all([
            //     getusers1(),
            //     getevents1(),
            //     getbookings()
            // ]);
            // await async.parallel([
            //     getusers1,
            //     getevents1,
            //     getbookings
            // ],function(error,result){
            //     try{
            //         console.log("error ",error);
            //         console.log("result ",result);
            //         let ans = {};
            //         result.map((ele,index)=>{
            //             if(index===0){
            //                 ans["users"]=ele;
            //             }else if(index===1){
            //                 ans["events"]=ele;
            //             }else{
            //                 ans["bookings"]=ele;
            //             }
            //         })
            //         console.log(ans);
            //         ans1=ans;
            //         // return ans;
            //     }
            //     catch(error){
            //         console.log(error);
            //     }
            // });
            console.log("final ans",result);
            let ans = {};
            result.map((ele,index)=>{
                if(index===0){
                    ans["users"]=ele;
                }else if(index===1){
                    ans["events"]=ele;
                }else{
                    ans["bookings"]=ele;
                }
            })
            console.log(ans);
            return ans;
        }
        catch(error){
            console.log(error);
        }
    }
}