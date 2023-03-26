/** @format */

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const queryFunction = require("../components/queryFunction");
const sql = require("../components/sql");

// allows us to use .env variables
require("dotenv").config();

// create a backend server
const app = express();

// middleware to parse json from request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// set up router
app.get("/api/first/:paramVar", queryFunction.queryParam(0));
app.get("/api/second/:paramVar", queryFunction.queryParam(1));
app.get("/api/third/:paramVar", queryFunction.queryParam(2));
app.get("/api/fourth/:paramVar1/:paramVar2", queryFunction.queryParam(3));
// app.get("/api/fifth/:paramVar1/:paramVar2", queryFunction.queryParam(4));
// app.get("/api/sixth/:paramVar1/:paramVar2", queryFunction.queryParam(5));

app.post("/api/query", sql.executeQuery);

// create export
const config = {
  app: app,
};

module.exports = config;
