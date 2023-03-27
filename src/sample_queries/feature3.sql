-- Sample Query for feature #3
-- Case where selected_country is 'South Korea'
WITH Q3 AS (SELECT id FROM Airport 
 WHERE Country = 'South Korea')
 
SELECT COUNT(DISTINCT Airline_Id)
FROM Route 
WHERE (Destination_airport_ID in (select id from Q3) or 
  	   Source_airport_ID in (select id from Q3));