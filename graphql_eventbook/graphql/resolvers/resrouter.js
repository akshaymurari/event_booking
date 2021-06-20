const {getusers,createusers,login,link} = require("./usersres");

const {getevents,createevents} = require("./eventsres");

const bookingres = require("./booking");

module.exports = {
    user : getusers,
    link:link,
    event: getevents,
    create: createevents,
    createUser: createusers,
    login:login,
    ...bookingres
}