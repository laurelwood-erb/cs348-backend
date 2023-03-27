-- Sample Query for Feature #4
-- Case where chosen airport is "Pearson International Airport" which has id of 193. Hence, airport_id is replaced with 193
with Q4 as (select airline_id, count(*) as counting 
from Route where source_airport_id = 193 or destination_airport_id = 193 
group by airline_id
order by counting desc
limit 10)

select name from Airline as A where A.id in (select airline_id from Q4);
