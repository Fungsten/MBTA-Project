# Will's MBTA Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## About

I took it upon myself to learn a little bit about React.js as a part of this exercise.
As a result, the front end uses a lot of provided boilerplate when initializing a React project.

The back end hits the `https://api-v3.mbta.com/predictions` endpoint to gather the necessary information.
It also makes sure to use additional query parameters for location, commuter rail, etc.
And it refreshes every minute, which is far below the rate limit for an application without an API key.

Do note that the board will not display anything when there are no upcoming trips leaving from North Station,
so it will be empty at 1:00am. Otherwise, the board will display up to 10 upcoming trips (less if there are not as many predictions available
at a particular time).

Thank you for taking the time to check this out!
