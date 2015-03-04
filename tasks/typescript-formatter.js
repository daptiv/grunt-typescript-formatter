"use strict";

module.exports = function(grunt) {
  var _ = require('underscore');
  require('native-promise-only');
  var path = require('path');
  var formatter = require("typescript-formatter");

  grunt.registerMultiTask("typescript-formatter", "A formatter for TypeScript.", function() {
    var options = this.options({ replace: true, dryRun: true });
    var done = this.async();
    var failed = 0;


    // Iterate over all specified file groups, async for 'streaming' output on large projects
    grunt.util.async.reduce(this.files, true, function(success, filePair, callback) {
      var files = filePair.src;
      if (!grunt.file.isDir(filePair.dest)) {
        grunt.log.error("Destination must be a folder", filePair.dest);
        failed++;
    }
      var result = formatter.processFiles(files, options);
      _.each(result, function(file) {
        if(!options.replace) {
          grunt.file.write(path.resolve(filePair.dest, file.fileName), file.dest);
        }
      });
      // Using setTimout as process.nextTick() doesn't flush
      setImmediate(function() {
        callback(null, success);
      });

    }, function(err, success) {
        if (err) {
            done(err);
        } else if (!success) {
            grunt.log.error(failed + " " + grunt.util.pluralize(failed,"error/errors"));
            done(false);
        } else {
            grunt.log.ok("files reformatted.");
            done();
        }
    }.bind(this));
  });

};
