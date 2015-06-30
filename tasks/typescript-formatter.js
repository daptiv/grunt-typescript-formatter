"use strict";

module.exports = function(grunt) {
  var _ = require('underscore');
  require('native-promise-only');
  var path = require('path');
  var formatter = require("typescript-formatter");
  var async = require('async');

  grunt.registerMultiTask("typescript-formatter", "A formatter for TypeScript.", function() {
    var options = this.options({ replace: true, dryRun: true });
    var done = this.async();
    var failed = 0;


    // Iterate over all specified file groups, async for 'streaming' output on large projects
    async.reduce(this.files, true, function(success, filePair, callback) {
      var files = filePair.src;

      formatter.processFiles(files, options).then(function(result) {
        _.each(result, function(file) {
          if(file.error) {
            failed++;
            grunt.log.error(file.message);
          }
        });

        if (failed > 0) {
          callback(true);
          return;
        }

        if(!options.replace)
        {
            if (!grunt.file.isDir(filePair.dest)) {
              grunt.log.error("Destination must be a folder", filePair.dest);
              failed++;
              callback(true);
              return;
            } else {
                _.each(result, function(file) {
                  grunt.file.write(path.resolve(filePair.dest, file.fileName), file.dest);
                });
            }
        }

        // Using setTimout as process.nextTick() doesn't flush
        setImmediate(function() {
          callback(null, success);
        });
      });

    }, function(err, success) {
        if (err || !success) {
            grunt.log.error(failed + " " + grunt.util.pluralize(failed,"error/errors"));
            done(false);
        } else {
          if (options.verify) {
            grunt.log.ok("files in correct format.");
          } else {
            grunt.log.ok("files reformatted.");
          }
          done();
        }
    }.bind(this));
  });

};
