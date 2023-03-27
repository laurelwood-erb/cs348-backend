-- Sample Query for Feature #5
-- Case where user chose 2531 as source airport id and 2633 as destination airport id
-- Hence, airportA is replaced with 2531 and airportB is replaced with 2633

WITH flight AS
  (SELECT * FROM Flight WHERE route_id IN (SELECT id FROM Route AS R
						WHERE R.source_airport_id = 2531 
						AND R.destination_airport_id = 2633))
SELECT flight.id AS flight_id, 
       flight.flight_status, 
       flight.flight_date, 
       flight.route_id,
	     flight.airplane_id, 
       Airplane.name AS airplane_name
FROM Airplane
INNER JOIN flight
ON Airplane.id = flight.airplane_id
ORDER BY flight.flight_date
