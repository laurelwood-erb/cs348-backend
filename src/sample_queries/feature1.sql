-- Sample query for feature #1
-- Case where input is -5, meaning time zone of GMT-5
select count(*) 
from Airport 
where Timezone = -5;
