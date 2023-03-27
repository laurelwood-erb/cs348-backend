-- Sample Query for Feature #7
-- Case where an aircraft interested in is "Boeing 737-900". Hence, airplane_name is replaced with "Boeing 737-900"
with Q7 as 
(select R.source_airport_id, R.destination_airport_id
from (select id from Airplane 
where name = 'Boeing 737-900') as A, 
Flight as F, Route as R 
where A.id = F.airplane_id and F.route_id = R.id)

select distinct country from Airport, Q7
where Airport.id = Q7.source_airport_id 
or Airport.id =  Q7.destination_airport_id;
