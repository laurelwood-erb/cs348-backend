exports.queryList = [
  `
  select count(*) 
  from Airport 
  where Timezone = ? ;`,
  `
  with Q2 as (select * from Route 
  where Route.source_airport_id = ?)

  select Airport.id, Airport.name, Airport.city, Airport.country 
  from Airport inner join Q2 on Airport.ID = destination_airport_id;
  `,
  `
  WITH Q3 AS (SELECT id FROM Airport 
    WHERE Country = ?)
  
  SELECT COUNT(DISTINCT Airline_Id)
  FROM Route 
  WHERE (Destination_airport_ID in (select id from Q3) 
    or 
    Source_airport_ID in (select id from Q3));
  `,
  `
  with Q4 as (select airline_id, count(*) as counting 
  from Route where source_airport_id = ? or destination_airport_id = ? 
  group by airline_id
  order by counting desc
  limit 10)

  select name from airline as A where A.id in (select airline_id from Q4);
  `,
  `
  with airport1 as
  (select id from airport where name = ?),
  airport2 as 
  (select id from airport where name = ?)
  select name from Airplane as A
  where id in (select airplane_id from Flight as F join Route as R on (F.route_id = R.id)
        where (R.source_airport_id in (select * from airport1) and R.destination_airport_id in (select * from airport2)) 
              or (R.source_airport_id in (select * from airport2) and R.destination_airport_id in (select * from airport2)))
  `,
  `
  WITH Departure AS 
  (SELECT ID FROM Airport WHERE country = ?), 
  Destination AS 
  (SELECT ID FROM Airport WHERE country = ?), 
  All_Routes as (
    SELECT * FROM Route 
    WHERE source_airport_id in (select * from Departure) 
      and destination_airport_id in (select * from Destination)
  )
  
  select distinct name from airline as A where A.id 
  in (select airline_id from All_Routes);
  `, 
  `
  with Q7 as 
  (select R.source_airport_id, R.destination_airport_id
  from (select id from Airplane where name = ?) as A, Flight as F, Route as R 
  where A.id = F.airplane_id and F.route_id = R.id)

  select distinct country from Airport, Q7
  where Airport.id = Q7.source_airport_id or Airport.id =  Q7.destination_airport_id
  order by country
  `,
];
