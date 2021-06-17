const {getusers,createusers} = require("./usersres");

const {getevents,createevents} = require("./eventsres");

module.exports = {
    user : getusers,
    event: getevents,
    create: createevents,
    createUser: createusers,
  }