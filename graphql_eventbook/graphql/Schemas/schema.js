const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Event {
        id:ID!
        userUsername:String!
        title:String!
        description:String!
        price:Float!
        date:String!
    }
    type User{
    username:String!
    }
    type UserEvents{
    username:String!
    events:[Event!]!
    }
    input UserInput{
    username:String!,
    password:String!
    }
    input InputEvent{
        title:String!
        description:String!
        price:Float!
        date:String!
        userUsername:String!
    }
    type query{
        event : [Event!]!
        user : [UserEvents!]!
    }
    type create{
        create(event:InputEvent):Event
        createUser(user:UserInput):User
    }
    schema {
        query:query,
        mutation:create
    }
`);

module.exports = schema;