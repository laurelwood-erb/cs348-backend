/** @format */

const queries = require("../models/queries");
const mysql = require("mysql2");

const DATABASE_HOST = "localhost";
const DATABASE_USER = "root";
const DATABASE_PASSWORD = "123456789";
const DATABASE_NAME = "cs348";

const connection = mysql.createConnection({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
});

exports.queryParam = (queryNum) => async (req, res) => {
  const params =
    queryNum < 3 || queryNum == 7
      ? [req.params["paramVar"]]
      : [req.params["paramVar1"], req.params["paramVar2"]];

  try {
    connection.query(
      queries.queryList[queryNum],
      params,
      function (err, results) {
        if (err) throw err;
        return res.json(results);
      }
    );
  } catch (err) {
    return res.status(500).send();
  }
};
