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
    tsfmt: {
      test: {
        options: {
            replace: false
        },
        files: { "tmp/formattedFile.ts": "test/fixtures/unformattedFile.ts" }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks("tasks");

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.registerTask("test", ["tsfmt"]);

  // By default, lint and run all tests.
  grunt.registerTask("default", ["jshint", "test"]);

};
