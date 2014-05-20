"use strict";

module.exports = function(grunt) {

  var formatter = require("typescript-formatter");

  grunt.registerMultiTask("tsfmt", "A formatter for TypeScript.", function() {
    var options = this.options({ replace: true, dryRun: true });
    var done = this.async();
    var failed = 0;


    // Iterate over all specified file groups, async for 'streaming' output on large projects
    grunt.util.async.reduce(this.files, true, function(success, filePair, callback) {
      var files = filePair.src;

      if (files.length > 1) {
        grunt.log.warn('Cannot format multiple files into one destination"', + files);
        failed++;
        success = false;
        return;
      }

      var filepath = files.pop();
      if (!filepath || !grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        failed++;
        success = false;
      } else {
        var contents = grunt.file.read(filepath);
        var result = formatter.processFiles([filepath], options);
        if(!options.replace) {
          grunt.file.write(filePair.dest, result[filepath].dest);
        }
      }
      // Using setTimout as process.nextTick() doesn't flush
      setImmediate(function() {
        callback(null, success);
      });

    }, function(err, success) {
        if (err) {
            done(err);
        } else if (!success) {
            grunt.log.error(failed + " " + grunt.util.pluralize(failed,"error/errors") + " in " +
                            this.files.length + " " + grunt.util.pluralize(this.files.length,"file/files"));
            done(false);
        } else {
            grunt.log.ok(this.files.length + " " + grunt.util.pluralize(this.files.length,"file/files") + " reformatted.");
            done();
        }
    }.bind(this));
  });

};
