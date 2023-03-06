/** @format */

const bodyParser = require("body-parser");
const express = require("express");
const sql = require("../models/sql");

// allows us to use .env variables
require("dotenv").config();

// create a backend server
const app = express();

// middleware to parse json from request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up router
app.post("/api/query", sql.executeQuery);
app.post("/api/")

// create export
const config = {
  app: app,
};

module.exports = config;
