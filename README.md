<!-- @format -->

# Setup

### 1. Download necassary packages

Run `npm i` on the root level of the backend directory

### 2. Download mysql

you must have mysql downloaded. You can download it from "https://dev.mysql.com/downloads/mysql/". Once downloaded, it will prompt you to set your password. Please replace DATABASE_PASSWORD in script/populate.js and script/tables.js.

### 3. Create tables

Run `npm run table`. This will create all our tables.

### 4. Populate data

Run `npm run populate`. This will populate our data.

If the above script results in `ER_DUP_ENTRY` with `result undefined`, make sure to clear the database and recreate the tables and populate data.

### 5. Start up the server

Finally, run `npm run start` to start up the backend server. We have one endpoint `/api/query` which is a post request that will execute a query from the body. (query can be SELECT, INSERT, UPDATE, DELETE, etc).

e.g. POST request to http://localhost:8080/api/query with header set to 
```
{ 'Content-Type': 'application/json' }
```
and body set to 
```
{ 'query': 'SELECT \* FROM airplane LIMIT 10' }
```
