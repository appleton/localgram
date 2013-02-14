# Localgram

This is an example JavaScript application which uses [Backbone][backbone] and
[Requirejs][requirejs]. It uses [Jam][jam] for package management and has a
set of tests written with [Jasmine][jasmine]. It uses [Grunt][] (0.4) as a
build tool.

It uses the [Geolocation API][geolocation] and the
[Instagram API][instagram-api] to show a set of nearby photos.

## Setup

You will need [Node.js][node] and NPM installed. Visit the
[Node.js website][node] for instructions for your OS.

1. Clone the repo:
```bash
$ git clone git@github.com:mrappleton/localgram.git
```

2. Install build dependencies (these are listed in `package.json` under
`devDependencies`):
```bash
$ npm install
```

3. Install front end dependencies:
```bash
$ jam install
```

4. Rename `js/constants.js.example` to `js/constants.js`:
```bash
$ mv js/constants.js.example js/constants.js
```

5. Visit Instagram and [register an API client][instagram-register]. Copy your
`client_id` into `js/contants.js`.

6. Run the development server and visit http://localhost:8000/ in a browser.
```bash
$ grunt connect:dev
```

## Grunt tasks

This project includes a number of Grunt build tasks:

1. `grunt jshint`: Runs all JavaScript against [JSHint][jshint].

2. `grunt spec`: Runs Jasmine tests in a headless [PhantomJS][phantomjs]
instance.

3. `grunt spec-server` builds the Jasmine spec runner file and starts a server to view it in a browser. Visit http://localhost:1337/_SpecRunner.html for
easier test debugging

## Project compilation

The application is split across may different files. THey can be built together
into a single file suitable for production deployment by running:
```bash
$ jam compile build/app.js
```

This run the [r.js optimizer][rjs] and put the compiled output into
`build/app.js`.

[backbone]: http://backbonejs.org/
[requirejs]: http://requirejs.org/
[jam]: http://jamjs.org/
[jasmine]: http://pivotal.github.com/jasmine/
[grunt]: http://gruntjs.com/
[geolocation]: http://dev.w3.org/geo/api/spec-source.html
[instagram-api]: http://instagram.com/developer/
[node]: http://nodejs.org/
[npm]: https://npmjs.org/
[instagram-register]: http://instagram.com/developer/clients/manage/
[jshint]: http://www.jshint.com/
[phantomjs]: http://phantomjs.org/
[rjs]: http://requirejs.org/docs/optimization.html