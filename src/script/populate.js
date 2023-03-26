/** @format */

const fs = require("fs");
const { parse } = require("csv-parse");
const mysql = require("mysql2");
const path = require("path");

const DATABASE_HOST = "localhost";
const DATABASE_USER = "root";
const DATABASE_PASSWORD = "123456789";
const DATABASE_NAME = "cs348";

// create connection
const connection = mysql.createConnection({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
});

// table information
const data = [
  {
    name: "airline",
    path: path.join(__dirname, "../../data/airlines.csv"),
    query:
      "INSERT INTO Airline (id, name, alias, IATA, ICAO, callsign, country, active) VALUES ?",
    indices: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    name: "airplane",
    path: path.join(__dirname, "../../data/airplanes.csv"),
    query: "INSERT INTO Airplane (name, IATA, ICAO) VALUES ?",
    indices: [0, 1, 2],
  },
  {
    name: "airport",
    path: path.join(__dirname, "../../data/airports.csv"),
    query:
      "INSERT INTO Airport (id, name, city, country, IATA, ICAO, latitude, longitude, altitude, timezone, DST) VALUES ?",
    indices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    name: "route",
    path: path.join(__dirname, "../../data/routes.csv"),
    query:
      "INSERT INTO Route (airline_id, source_airport_id, destination_airport_id, codeshare, equipment) VALUES ?",
    indices: [1, 3, 5, 6, 8],
  },
  {
    name: "flight",
    path: path.join(__dirname, "../../data/flights.csv"),
    query:
      "INSERT INTO Flight (flight_status, flight_date, route_id, airplane_IATA, airplane_ICAO) VALUES ?",
    indices: [0, 1, 2, 3, 4],
  },
];

connection.connect();

// insert each table
data.forEach((table_info) => {
  const table_data = [];
  fs.createReadStream(table_info.path, "utf8")
    .pipe(
      parse({
        delimiter: ",",
        from_line: 2,
        columns: false,
        trim: true,
        skip_records_with_empty_values: true,
        skip_empty_lines: true,
        cast: function (value, _context) {
          if (value == "") return null;
          if (value.match(/^[\\|'|N]*$/)) return null;
          return value;
        },
      })
    )
    .on("data", function (data) {
      table_data.push(data);
    })
    .on("end", async () => {
      connection.query(
        table_info.query,
        [
          table_data.map((data) => {
            return table_info.indices.map((i) => data[i]);
          }),
        ],
        function (error, result) {
          console.log("error", error);
          console.log("result", result);
        }
      );
    });
});
