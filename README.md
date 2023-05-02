see collab.txt for Household Manager collaboration

Configuration:

To start the local application, three servers must be running. Frontend Server, Backend Server, and MySQL

Steps to run Backend on LocalHost:
To use this project you will need to have MySQL and MySQL Workbench installed. This server will be running on localhost:3306. For your MySQL setting, you will want to have your username to be "root", and your password to be "password". Then in the MySQL workbench, create a schema called HMADatabase. You are now ready to run the backend server.

To run the backend server, cd to Household_Manager_Application and run  **./mvnw spring-boot:run** in the terminal. This should start the back end server. Now you are ready to run the front end server on a new terminal window.

Starting the Frontend Server:
Required Packages:
- Node - https://nodejs.org/en/download
- NPM - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Steps to Run Frontend on LocalHost:
1. cd to src/main/ui
2. run `npm install` 
3. run `npm run start`
4. The client will be available at: http://localhost:3000/ if the port is not taken.
