see collab.txt for Household Manager collaboration

Configuration:

To start the local application, three servers must be running on separate terminals: Frontend Server, Backend Server, and MySQL

Steps to run Backend on LocalHost:
To use this project you will need to have MySQL and MySQL Workbench installed. This server will be running on localhost:3306. For your MySQL setting, you will want to have your username to be "root", and your password to be "password". Then in the MySQL workbench, create a schema called HMADatabase. You are now ready to run the backend server.

If you are unable to change your MySQL credentials, cd into /Household_Manager_Application/src/main/resources. Then run the command **vi application.properties** or simply open application.properties to change the MySQL connection for the backend. Once in this file, change:
- spring.datasource.username="your_username"
- spring.datasource.password="your_password"
- spring.datasource.url="url" (if you want to change the default mysql db url connection)
and then **:wq** to save your changes. Now cd into /Household_Manager_Application.

To run the backend server, cd to Household_Manager_Application / the root of this project and run  **./mvnw spring-boot:run** in the terminal. This should start the back end server. Now you are ready to run the front end server on a new terminal window.

Starting the React Frontend Server:
Required Packages:
- Node - https://nodejs.org/en/download
- NPM - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Steps to Run Frontend on LocalHost:
1. cd to src/main/ui
2. run `npm install` 
3. run `npm run start`
4. The client will be available at: http://localhost:3000/ if the port is not taken.

Once the Frontend, Backend, and MySQL Server are running,
you are ready to start the application by going on your browser and going to the url:
http://localhost:3000/ (or whatever port number the react frontend server is saying)