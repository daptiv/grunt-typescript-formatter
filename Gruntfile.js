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
      test: {
        options: {
            replace: false
        },
        files: { "tmp/": "test/**/*.ts" }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks("tasks");

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.registerTask("test", ["typescript-formatter"]);

  // By default, lint and run all tests.
  grunt.registerTask("default", ["jshint", "test"]);

};
