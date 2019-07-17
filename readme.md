# WayFarer_API
WayFarer is a public bus transportation booking server.

[![Coverage Status](https://coveralls.io/repos/github/dewaleolaoye/WayFarer-API/badge.svg?branch=develop)](https://coveralls.io/github/dewaleolaoye/WayFarer-API?branch=develop)
[![Build Status](https://travis-ci.org/dewaleolaoye/WayFarer-API.svg?branch=develop)](https://travis-ci.org/dewaleolaoye/WayFarer-API)

## Required Features

- User can **sign up**
- User can **login**
- Admin can **create a trip**
- Admin can **cancel a trip**
- Both Admin and Users can **see all trips**
- Users can **book a seat a trip**
- An Admin can **see all bookings** while User can **see all of his/her bookings**
- User can **delete his/her booking**

## Optional Features

- Users can **get a list of filtered trips based on origin**
- Users can **get a list of filtered trips based on destination**
- Users can **change seats after booking**

## Technologies

- Node JS
- Express
- Postgres
- Mocha & Chai
- ESLint
- Babel
- Travis CI
- Coveralls

## Requirements and Installation

To install and run this project you would need to have listed techo installed:

- Node.js

- To run:

```sh
git clone <https://github.com/tobslob/WayFarer-API.git>
cd WayFarer-API
npm install
npm run start:dev
```

## Testing

```sh
npm run test
```

## API-ENDPOINTS

- v1

`- POST /api/v1/signup Create user account`

`- POST /api/api/v1/signin Login a user`

`- POST /api/v1/trips Create a trip`

`- PATCH /api/v1/trips/<:trip_id> Cancel a trip`

`- GET /api/v1/trips See all trips`

`- POST /api/v1/bookings Book a seat on a trip`

`- GET /api/v1/bookings See all bookings`

`- DELETE /api/v1/bookings/<:booking_id> Delete their booking`

## Pivotal Tracker stories

[https://www.pivotaltracker.com/n/projects/2363161](https://www.pivotaltracker.com/n/projects/2363161)

## API

The API is currently in version 1 (v1) and is hosted at

[https://enigmatic-wave-60222.herokuapp.com/](https://enigmatic-wave-60222.herokuapp.com/)

## Author

Olaoye Adewale Abiodun
