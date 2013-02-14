'use strict';

var fs = require('fs'),
    path = require('path');

function middleware(connect, opts) {
  return [
    // Terminal request logging
    connect.logger('dev'),

    // Serve static files
    connect.static(opts.base),

    function(req, res, next) {
      // Fall through to 404 if there's a path extension.
      // Our Backbone routes don't have this so it must be a request for a
      // resource that's not there.
      if (path.extname(req.url) !== '') { return next(); }

      // Else render the index.html and let our router handle it.
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      fs.createReadStream('index.html').pipe(res);
    }
  ];
}

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta : {
      src: 'js/src/**/*.js',
      specs: 'spec/**/*spec.js'
    },

    // Spec server
    connect: {
      spec : {
        options: {
          port : 1337
        }
      },
      dev: {
        options: {
          port: 8000,
          keepalive: true,
          middleware: middleware
        }
      }
    },

    // Code quality
    jshint: {
      all: [ 'Gruntfile.js', '<%= meta.src %>', '<%= meta.specs %>' ],
      options: {
        jshintrc: '/Users/andy/.jshintrc'
      }
    },

    // Unit tests
    jasmine: {
      src: '<%= meta.src %>',
      options: {
        helpers: 'spec/support/**.js',
        specs: '<%= meta.specs %>',
        template: require('grunt-template-jasmine-requirejs'),
        host: 'http://127.0.0.1:1337/',
        templateOptions: {
          requireConfig: (function() {
            // Set up requirejs config for specs
            var requireConfig = require('./jam/require.config');
            requireConfig.baseUrl = '/js/';
            return requireConfig;
          })()
        }
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Run a server then run specs
  grunt.registerTask('spec', ['connect:spec', 'jasmine']);

  // Run a server to access specs in a browser
  grunt.registerTask('spec-server', ['jasmine::build', 'connect:spec:keepalive']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'spec']);

};
