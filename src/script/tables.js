/** @format */

const mysql = require("mysql2");

const DATABASE_HOST = "localhost";
const DATABASE_USER = "root";
const DATABASE_PASSWORD = "123456789";
const DATABASE_NAME = "cs348";

// create connection
const sqlconnection = mysql.createConnection({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
});

// connect with the database
sqlconnection.connect();

// create the database
sqlconnection.query(
  `CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`,
  function (err, result) {
    if (err) throw err;
    console.log("Database created");
  }
);

// end the connection
sqlconnection.end();

// tables to be created
const tables = [
  `CREATE TABLE IF NOT EXISTS Airline
          (id numeric(5,0),
          name varchar(256),
          alias varchar(256),
          IATA varchar(2),
          ICAO varchar(3),
          callsign varchar(256),
          country varchar(256),
          active varchar(1) check (active = "Y" or active = "N"),
          primary key (id))`,
  `CREATE TABLE IF NOT EXISTS Airport
          (id numeric(5,0),
          name varchar(256),
          city varchar(256),
          country varchar(256),
          IATA varchar(4),
          ICAO varchar(5),
          latitude real,
          longitude real,
          altitude smallint,
          timezone numeric(3),
          DST  varchar(1),
          primary key (id))`,
  `CREATE TABLE IF NOT EXISTS Route
          (id int NOT NULL AUTO_INCREMENT,
          airline_id numeric(5,0),
          source_airport_id numeric(5,0),
          destination_airport_id numeric(5,0),
          codeshare varchar(1),
          equipment varchar(40),
          primary key (id),
          foreign key (airline_id) references Airline(id),
          foreign key (source_airport_id) references Airport(id),
          foreign key (destination_airport_id) references Airport(id))`,
  `CREATE TABLE IF NOT EXISTS Airplane
          (name varchar(256),
          IATA varchar(4),
          ICAO varchar(5),
          primary key (IATA, ICAO))`,
  `CREATE TABLE IF NOT EXISTS Flight
          (id int NOT NULL AUTO_INCREMENT,
          flight_status varchar(9),
          flight_date varchar(10),
          route_id int,
          airplane_IATA varchar(4),
          primary key (id),
          foreign key (route_id) references Route(id),
          foreign key (airplane_IATA) references Airplane(IATA))`,
];

// create connection
const connection = mysql.createConnection({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
});

// connect with the database
connection.connect();

// create tables
tables.forEach(function (table) {
  connection.query(table, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

// end the connection
connection.end();
