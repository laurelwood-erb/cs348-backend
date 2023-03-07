/** @format */

const bodyParser = require("body-parser");
const express = require("express");
const { getCountriesByAirline } = require("../components/getCountriesByAirline");
const sql = require("../models/sql");

// allows us to use .env variables
require("dotenv").config();

// create a backend server
const app = express();

// middleware to parse json from request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up router
app.get("/api/airline-countries:airline", (req, res) => {
  res.send(getCountriesByAirline(req.params.airline))
});
app.post("/api/query", sql.executeQuery)

// create export
const config = {
  app: app,
};

module.exports = config;
