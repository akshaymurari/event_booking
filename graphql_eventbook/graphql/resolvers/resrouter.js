const {getusers,createusers} = require("./usersres");

const {getevents,createevents} = require("./eventsres");

const bookingres = require("./booking");

module.exports = {
    user : getusers,
    event: getevents,
    create: createevents,
    createUser: createusers,
    ...bookingres
}