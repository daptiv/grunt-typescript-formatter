"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        "Gruntfile.js",
        "tasks/*.js"
      ],
      options: {
        jshintrc: ".jshintrc",
      },
    },

    // Configuration to be run (and then tested).
    'typescript-formatter': {
      replaceInTemp: {
        options: {
            replace: false,
            verbose: true,
        },
        files: { "tmp/": "test/**/*.ts" }
      },
      verifyTemp: {
        options: {
            verbose: true,
            replace: false,
            verify: true
        },
        files:
        {
            src: ["tmp/**/*.ts"]
        }
      }

    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks("./tasks");

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.registerTask("test", ["typescript-formatter:replaceInTemp"]);
  grunt.registerTask("test2", ["typescript-formatter:verifyTemp"]);

  // By default, lint and run all tests.
  grunt.registerTask("default", ["jshint", "test"]);

};
