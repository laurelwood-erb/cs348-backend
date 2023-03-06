# Backend for CS348 Group Project by Laurelwood-Erb (PG13)

## Requirements
- You need followings installed in your device
  1. `npm` (Essentially `Node.js`)
  2. `MySQL`, which can be downloaded <a href="https://dev.mysql.com/downloads/mysql/">here</a>
- You need to <u>**modify foloowing components in source code**</u>
  - Under root directory for the backend, move to `./src/script` directory
  - Find `populate.js` and `tables.js` inside it
  - Find a variable declaration with following line
    ```JS
    const DATABASE_PASSWORD = "123456789";
    ```
  - Change RHS of declaration with your own password to `MySQL`

<br>

## Running Our Application
<u>**Please follow these steps carefully**</u>

1. Clone our two repositories:
- Frontend: https://github.com/laurelwood-erb/cs348-frontend
<br>
- Backend:  https://github.com/laurelwood-erb/cs348-backend
<br>
- Use either `$ git clone` or simply download
- For frontend instructions, click the link of the above frontend repo.

2. Install necessary packages for *backend* and start its application
    1. In the backend repo, execute this command
        ```
        $ npm i
        ```
    2. Execute following commands one by one to create and populate tables and data
        ```
        $ npm run table
        $ npm run populate
        ```
        If the above `populate` script results in `ER_DUP_ENTRY` with `result undefined`, make sure to clear the database and recreate the tables and populate data.
    3. Start the backend server by executing this command
        ```
        $ npm run start
        ```
        We have one endpoint `/api/query` which is a post request that will execute a query from the body. (query can be SELECT, INSERT, UPDATE, DELETE, etc).
        
        e.g. POST request to http://localhost:8080/api/query with header set to 
        ```
        { 'Content-Type': 'application/json' }
        ```
        and body set to 
        ```
        { 'query': 'SELECT \* FROM airplane LIMIT 10' }
        ```
3. As mentioned, run our front-end application, which its instruction to run the application can be found <a href="https://github.com/laurelwood-erb/cs348-frontend">here</a>

<br>

## Create and Load Sample DataBase
- As quickly mentioned in step 2.2, our database is loaded and created by running those two "script" files
- `./src/script/tables.js` will be responsible for creating necessary tables
- `./src/script/populate.js` will be acting as a script which takes in `.csv` files to populate appropriate data for `MySQL` 

<br>

## Features Supported

Following is the list of features that we are currently supporting
-  *How many countries does this airline operate in?*
   -  By "operate", we mean that airlines who have route arriving/leaving a country
   -  Our feature will count number of countries that an airline operates
