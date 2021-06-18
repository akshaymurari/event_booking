const {getusers,createusers,login} = require("./usersres");

const {getevents,createevents} = require("./eventsres");

const bookingres = require("./booking");

module.exports = {
    user : getusers,
    event: getevents,
    create: createevents,
    createUser: createusers,
    login:login,
    ...bookingres
}