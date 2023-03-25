const mysql = require("mysql2");
const queries = require("../models/queries");

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

connection.connect();

const query = `WITH 
airline_id AS 
(SELECT id FROM Airline WHERE Name = ?), 

source_ids AS 
(SELECT Source_airport_ID as id FROM Route WHERE route.Airline_ID = airline_id), 

destination_ids AS 
(SELECT Destination_airport_ID as id FROM Route WHERE route.Airline_ID = airline_id) 

select distinct count(*)  
from ((select * from source_ids) UNION (select * from destination_ids)) as ids join Airport on ids.id = Airport.id    
`;

exports.queryParamOne = (queryNum) => async (req, res) => {
  try {
    connection.query(
      queries.queryList[queryNum],
      [req.params["paramVar"]],
      function (err, results) {
        if (err) throw err;
        return res.json(results[0]["count(*)"]);
      }
    );
  } catch (err) {
    return res.status(500).send();
  }
};

exports.queryParamTwo = (queryNum) => async (req, res) => {
  try {
    connection.query(
      queries.queryList[queryNum],
      [req.params["paramVar1"], req.params["paramVar2"]],
      function (err, results) {
        if (err) throw err;
        return res.json(results[0]["count(*)"]);
      }
    );
  } catch (err) {
    return res.status(500).send();
  }
};
