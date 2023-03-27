-- Sample Query for Feature #6
-- Case where user chose a route from "United States" to "Canada".
-- Hence, origin_country is replaced with "United States" and destiniation_country is replaced with "Canada"
WITH 
Departure AS 
(SELECT ID FROM Airport WHERE country = 'United States'), 

Destination AS 
(SELECT ID FROM Airport WHERE country = 'Canada'), 

All_Routes as (
SELECT * FROM Route 
WHERE source_airport_id in (select * from Departure) and 
      destination_airport_id in (select * from Destination))

select distinct name from airline as A where A.id 
in (select airline_id from All_Routes);
