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
        (id NUMERIC(5,0),
        name VARCHAR(256),
        alias VARCHAR(256),
        IATA VARCHAR(2),
        ICAO VARCHAR(3),
        callsign VARCHAR(256),
        country VARCHAR(256) NOT NULL,
        active VARCHAR(1) check (active = "Y" or active = "N"),
        PRIMARY KEY (id),
        CONSTRAINT AirlineIATAorICAO CHECK (NOT (IATA is NULL AND ICAO is NULL)),
        CONSTRAINT AirlineIATAForm CHECK (IATA is NULL OR IATA REGEXP '^[A-Z0-9]{2}$'),
        CONSTRAINT AirlineICAOForm CHECK (ICAO is NULL OR ICAO REGEXP '^[A-Z0-9]{3}$'))`,
  `CREATE TABLE IF NOT EXISTS Airport
        (id NUMERIC(5,0),
        name VARCHAR(256) NOT NULL,
        city VARCHAR(256) NOT NULL,
        country VARCHAR(256) NOT NULL,
        IATA VARCHAR(4),
        ICAO VARCHAR(5),
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        altitude SMALLINT NOT NULL,
        timezone NUMERIC(3) NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT AirportIATAorICAO CHECK (NOT (IATA is NULL AND ICAO is NULL)),
        CONSTRAINT AirportIATAForm CHECK (IATA is NULL OR IATA REGEXP '^[A-Z0-9]{3}$'),
        CONSTRAINT AirportICAOForm CHECK (ICAO is NULL OR ICAO REGEXP '^[A-Z0-9]{4}$'))`,
  `CREATE TABLE IF NOT EXISTS Route
        (id NUMERIC(6,0),
        airline_id NUMERIC(5,0),
        source_airport_id NUMERIC(5,0),
        destination_airport_id NUMERIC(5,0),
        codeshare VARCHAR(1),
        equipment VARCHAR(40),
        PRIMARY KEY (id),
        foreign key (airline_id) references Airline(id) ON DELETE CASCADE,
        foreign key (source_airport_id) references Airport(id) ON DELETE CASCADE,
        foreign key (destination_airport_id) references Airport(id) ON DELETE CASCADE)`,
  `CREATE TABLE IF NOT EXISTS Airplane
        (id NUMERIC(4,0),
        name VARCHAR(256),
        IATA VARCHAR(4),
        ICAO VARCHAR(5),
        PRIMARY KEY (id),
        CONSTRAINT AirplaneIATAForm CHECK (IATA is NULL OR IATA REGEXP '^[A-Z0-9]{3}$'),
        CONSTRAINT AirplaneICAOForm CHECK (ICAO is NULL OR ICAO REGEXP '^[A-Z0-9]{4}$'))`,
  `CREATE TABLE IF NOT EXISTS Flight
        (id NUMERIC(5,0),
        flight_status VARCHAR(9),
        flight_date VARCHAR(10),
        route_id NUMERIC(6,0),
        airplane_id NUMERIC(4,0),
        PRIMARY KEY (id),
        foreign key (route_id) references Route(id) ON DELETE CASCADE,
        foreign key (airplane_id) references Airplane(id) ON DELETE CASCADE)`
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
