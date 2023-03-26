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
  ``,
  ``,
];
