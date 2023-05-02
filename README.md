see collab.txt for Household Manager collaboration

Starting the Frontend Server:
Required Packages:
- Node - https://nodejs.org/en/download
- NPM - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Steps to Run Frontend on LocalHost:
1. cd to src/main/ui
2. run `npm install` 
3. run `npm run start`
4. The client will be available at: http://localhost:3000/ if the port is not taken.

BackEnd PreRequisites
In order to use/test/work on the back end code, you will need to do a couple things first. First and foremost, it is necessary to use IntelliJ as this IDE has many things built in that make development a lot easier. You can get IntelliJ Ultimate though the GitHub Student Developer 
Pack here or download the free version off of IntelliJ’s website. 

If you want database testing functionality you will need to download MySQL Community Server as well as the MySQL Workbench.

Once these are downloaded and you have pulled the code from the git repository you will want to go onto IntelliJ and navigate to src/main/resources/application.properties. In this file is my information but you will want to fill in the following sections with your own information.

Spring.datasource.username = “the username you use when setting up MySQL Workbench”
Spring.datasource.password = “pw that you use when setting up MySQL workbench”
Spring.datasource.url = jdbc:mysql://localhost:3306/{name of your local database}
Everything else in this file can be left alone.

To run the backend server, navigate to HouseholdManagerApplication and run  ./mvnw spring-boot:run in the terminal

