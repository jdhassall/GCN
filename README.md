# GCN Coding Test Running Instructions
(1) Save all files to your chosen directory capable of running NodeJs
(2) run command 'npm install' from the 'GCN/' directory to install all dependencies.
(3) Via your preferred method, CLI or MySQL Workbench for example, create a user 'gcn' with password 'password' and the correct privileges to access the database to be created 'mydb'
(4) Please do not alter the files 'search_filter (35)' and 'youtube(35).sql' provided.
(5) Create an API key for youtube API v3 and set the YOUTUBE_API_KEY variable in the .env file equal to your key.
(6) run 'npm start'. The program will start and run on localhost:3000.
(7i) To run endpoint 1a as denoted in the task use a mock front end such a postman and create a POST req pointed towards the URL 'http://localhost:3000/youtube_data' and then run the request.
(7ii) To run endpoint 1b run a GET request pointed at URL 'http://localhost:3000/results'
(7iii) To run endpoint 2 run a GET request pointed at URL 'http://localhost:3000/fetch_result_by_id' with the body { "id": INT }
(7iv) To run endpoint 3 run a DELETE request pointed at URL 'http://localhost:3000/delete_data_by_id' with the body { "id": INT }
(7v) To run endpoint 4 run a GET request pointed at URL 'fetch_by_term' with the body { "title": STRING, "date": "yyyy-mm-dd hh:mm:ss" }
