# Backend for CS348 Group Project by Laurelwood-Erb (PG13)

## Requirements
- You need followings installed in your device
  1. `npm` (Essentially `Node.js`)
  2. `MySQL`, which can be downloaded <a href="https://dev.mysql.com/downloads/mysql/">here</a>
- You need to <u>**modify following components in source code**</u>
  - Under root directory for the backend, move to `./src/script` directory
  - Find `populate.js` and `tables.js` inside it
  - Find a variable declaration with following line
    ```JS
    const DATABASE_PASSWORD = "123456789";
    ```
  - Change RHS of declaration with your own password to `MySQL`

<br>

## Note
> Sample queries are contained in `src/sample_queries` for each feature where output is based on production database

## Running Our Application
<u>**Please follow these steps carefully**</u>

1. Clone our two repositories:
- Frontend: https://github.com/laurelwood-erb/cs348-frontend
- Backend:  https://github.com/laurelwood-erb/cs348-backend
<br>

- Use either `$ git clone` or simply download in separate directory
- For frontend instructions, click the link of the above to frontend repo.

2. Install necessary packages for **backend** and start its application
    1. In the backend repo, execute this command
        ```
        $ npm i
        ```
    2. Execute following commands one by one to create and populate tables and data
        ```
        $ npm run table
        $ npm run populate
        ```
        - If the above `table` script results in `unknown database`, then simplt execute `$ npm run table` again
        
        - If the above `populate` script results in `ER_DUP_ENTRY` with `result undefined`, make sure to clear the database and recreate the tables and populate data.
        - **IMPORTANT**: after executing `populate` script and producing results, it may seem like that program is waiting for input and making no further process. <u>THIS IS NOT AN ERROR!</u> You should see 5 `ResultSetHeader`s. If so, terminate the program by `ctrl + c` and continue with next step.


    3. Create  your `.env` file with the following:

        | Name      | Description |
        | ----------- | ----------- |
        | `DATABASE_HOST=localhost`      | database host       |
        | `DATABASE_USER=root`| make sure database user is set to root        |
        | `DATABASE_PASSWORD={your_password}`| remove the variable in the parantheses and put your own password        |
        | `DATABASE_NAME=cs348`| set the database name as cs348        |
        | `PORT=8080`| set the sever port to 8080       |
    4. In the files `src/script/populate.js` and `src/script/tables.js` make sure to change the `DATABASE_PASSWORD` as your actual database password, same as you've done in your `.env` file.
    5. Start the backend server by executing this command
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

## Create and Load DataBase
- As quickly mentioned in step 2.2, our database is loaded and created by running those two "script" files
- `./src/script/tables.js` will be responsible for creating necessary tables
- `./src/script/populate.js` will be acting as a script which takes in `.csv` files to populate appropriate data for `MySQL` 

<br>

## Features Supported

Following is the list of features that we are currently supporting
1. *How many airports are in this timezone?*
   - This feature will count number airports located in selected timzone from user
2. *Which airports does this airport fly to?*
   - Given an airport, this feature will count number of airports that can be reached from chosen airport using existing `Routes`
3. *How many airlines are operated in this country?*
   -  By "operate", we mean that airlines who have route arriving/leaving a country
   -  Our feature will count number of countries that an airline operates
4. *What are the top 10 airlines that have the most routes in this airport?*
   - Given an airport, this feature will list of 10 airlines that operate the most route in chosen airport
5. *Given origin and destination airport, find all flights and name of the airplane used for each flight between two airports and order by its date*
   - This feature takes 2 inputs, origin and destination airports
   - This feature is focused on Flight information
6. *Given two countries, origin and destination country, display airlines that operates route(s) that leave from given origin country to given destination country*
   - This feature also takes 2 inputs, origin and destinaiton countries
   - This feature is focused on Route information

<br>

## Sample Query and Output
- As mentioned, you can find sample queries and output under `./src/samples`
- You will see that for each feature, there are 3 type of files, which are `.sql`, `.out`, `.csv`
- `.sql` will contain sample query itself
- `.out` and `.csv` both hold the output. Hence, their content is essentially the same.
- However, we have added `.csv` so that it is easier for you to view the output files. If you are using VSCode to view `.csv` file, we recommend using extension called "Edit csv" to view.
