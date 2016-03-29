# Yorkshire**Digital**


Bringing Yorkshire's digital community together.

## Prerequisites

This application uses MySql to persist it's state. You will need to have an instance running locally, be it installed locally or [running via docker](https://hub.docker.com/r/mysql/mysql-server/).

Once installed you will need to set the details in [/src/server/config/db-config](https://github.com/YorkshireDigital/yorkshiredigital.com/blob/master/src/server/config/db_config.js).

## Installation

Make sure you're using Node >= 4.0.0.

```bash
	git clone https://github.com/yorkshiredigital/yorkshiredigital.com.git
	cd yorkshiredigital.com

	npm install
	npm run dev     # start Hapi server and webpack-dev-server hot server

	# production build and run
	npm run production
	# or
	NODE_ENV=production npm run build
	NODE_ENV=production npm run start
```

## Project Architecture

This is an isomorphic react application. The main libraries used are:

 - [Redux](https://github.com/reactjs/redux) - state management
 - [React Router](https://github.com/reactjs/react-router) - Client side routing
 - [Hapi](https://github.com/hapijs/hapi) - Web server
 - [Sequelize](https://github.com/sequelize/sequelize) - ORM
 - [Material UI](https://github.com/callemall/material-ui) - UI Framework

This was originally a fork of  [luandro/hapi-universal-redux](https://github.com/luandro/hapi-universal-redux) but I have extended it to implement sequelize, authentication (jwt), proper devtools, redux-form and to conform to eslint (ticket arena rules).

## To do

 - Add test framework
 - Implement current YD functionality
	- Admin: Add events
	- Admin: Add groups
	- Admin: Enable integrations
		- Meetup.com
 - New features
	- User: Register
	- User: List your own event
	- User: "I am going" to an event
	- New integrations
		- Eventbrite
		- Open tech calendar
	- Admin: Add news articles
	- List speakers

## License

MIT license. Copyright © 2016, Yorkshire**Digtal**. All rights reserved.
