#  BUZZ
## Frontend server for the SWE project at FH Campus Wien

### Install dependencies

Make sure that you have [node v20.5.0 and npm 10.2.4](https://nodejs.org/en/download) installed. 
If you do, then run the command below to install the required dependencies:
```
npm install
```

### Scripts overview

In the project directory, you can run:

- `npm start` - Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.You will also see any lint errors in the console.

- `npm test` - Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- `npm run build` - Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
Your app is ready to be deployed! See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Environment variables
Create a `.env.local` file and set the following environment variables. Please note that any other custom environment variables must have the `REACT_APP_` prefix ([see docu](https://create-react-app.dev/docs/adding-custom-environment-variables/)):
* PORT - if you want to run the app on a different port. You can either use:
    * `PORT=<SOME_OTHER_PORT>` in the `.env.local` file
    * modify the `start` script in the `package.json` file:
        * `"start": "set PORT=<SOME_OTHER_PORT> && react-scripts start"`
* REACT_APP_BACKEND_PORT - set the port of the backend application


### Mock DB
If you don't want to start the backend application and want to mock the database, you can use the [json-server](https://github.com/typicode/json-server) package. 

Create a `db.json` file with some data:
```
{
  "users": [
    {
      "id": 1,
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@test.com",
      "username": "jdoe",
      "password": "abc123"
    }
  ]
}
```
Create a `routes.json` file with the following data:
```
{
    "/api/users": "/users",
    "/api/auth/login": "/login"
}
```
Then start the json-server with the following command:
```
npx json-server --watch db.json --routes routes.json --port <SOME_PORT>
```
The port used for json-server should be the same as the port used for the backend application in the `.env.local` file.

### Learn More
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
