-- Sample query for feature #2
-- Case where input was "Pearson Airport" which has id of 193. Hence, this query will take 193 as input
with Q2 as (select * from Route 
where Route.source_airport_id = 193)
 
select Airport.id, Airport.name, Airport.city, Airport.country 
from Airport inner join Q2 on Airport.ID = destination_airport_id;
