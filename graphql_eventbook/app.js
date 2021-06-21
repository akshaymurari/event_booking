require("dotenv").config();

const express = require("express");

const bodyParser = require("body-parser");

const { Sequelize, DataTypes, Op } = require("sequelize");

const { graphqlHTTP } = require("express-graphql");

const { buildSchema } = require("graphql");

const schema = require("./graphql/Schemas/schema");

const resolvers = require("./graphql/resolvers/resrouter");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(require("./graphql/resolvers/multipledata"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});


app.listen(8000, (error) => {
    console.log(error ? error : "listnening to port 8000");
});


app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
