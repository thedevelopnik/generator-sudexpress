# generator-sudexpress

An updated version of the [Galvanize Express Generator](https://www.npmjs.com/package/generator-galvanize-express) made by Michael Herman.

[Yeoman](http://yeoman.io) generator for a Node/Express boilerplate setup with PostgreSQL, using the following modules (for more details look at the package.json in app/templates):

* Bluebird for Promises
* Mocha for testing, chai for assertions, and chai-http for server-side testing
* knex for PostgreSQL queries, supported by pg
* Swig for templating

It uses Gulp for local development and builds. Builds use:
* Browserify for client-side javascript
* Babel (gulp) for ES6 compatibility
* JSHint for linting
* Browser-sync for local development

On the client-side, it includes Bootstrap and jQuery.


## Quick Start

1. Install Yeoman (if necessary) - `npm install -g yo`
1. Install the generator - `npm install -g generator-sudexpress`
1. Run - `yo sudexpress`
1. Install modules - `npm install`
1. Fire up the server - `gulp` (or create a build - `gulp build`)
