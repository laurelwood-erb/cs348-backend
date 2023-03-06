/** @format */

const connection = require("../config/connection");

exports.executeQuery = async (req, res) => {
  try {
    connection.query(req.body.query, function (err, rows, fields) {
      if (err) throw err;
      return res.status(200).send(rows);
    });
  } catch (err) {
    return res.status(500).send();
  }
};
