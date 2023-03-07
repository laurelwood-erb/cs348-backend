const connection = require("../config/connection")

exports.getCountriesByAirline = (airline) => {
    const query = `INPUT ?
    WITH airline_id(Airline_ID) AS
        (SELECT Airline_ID
        FROM Airlines
        WHERE Name = ?),
    source_ids (id) AS
        (SELECT Source_airport_ID
        FROM Routes
        WHERE Airline_ID = airline_id)
    destination_ids (id) AS
        (SELECT Destination_airport_ID
        FROM Routes
        WHERE Airline_ID = airline_id)
    SELECT DISTINCT COUNT(*)
    FROM ((source_ids UNION destination_ids) as ids join Airports
        on ids.id = Airports.Airport_ID)`
    let countries = "";
    connection.query(query, [airline, airline], function(err, results) {
        if (err) throw err;
        console.log("airline query received");
        console.log(results);
        countries = results;
    })
    return countries;
}