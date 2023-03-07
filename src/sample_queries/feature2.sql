-- Sample query for feature #2
create view T1 as 
select * from Route 
where Route.source_airport_id = 193
select Airport.id, Airport.name, Airport.city, Airport.country 
from Airport inner join T1 on Airport.ID = T1.destination_airport_id
