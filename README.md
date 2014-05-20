# grunt-tsfmt [![NPM version](https://badge.fury.io/js/grunt-tsfmt.png)](http://badge.fury.io/js/grunt-tsfmt)

> A grunt plugin for [tsfmt](https://github.com/vvakame/typescript-formatter).

## Getting Started
This plugin requires [Grunt](http://gruntjs.com/) `~0.4.1`

	npm install grunt-tsfmt --save-dev

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

	grunt.loadNpmTasks('grunt-tsfmt');

## The "tsfmt" task

### Overview
In your project's Gruntfile, add a section named `tsfmt` to the data object passed into `grunt.initConfig()`.

	grunt.initConfig({
	  tsfmt: {
	    options: {
    	  // Task-specific options go here.
	    },
	    files: {
    	  // Files to format go here
	    },
	  },
	})

### Options

#### options.configuration
Type: `Object`

A JSON configuration object passed into tsfmt.

### Usage Example

	grunt.initConfig({
	  tsfmt: {
	    options: {
	      configuration: grunt.file.readJSON("tsfmt.json")
	    },
	    files: {
	      src: ['src/file1.ts', 'src/file2.ts']
	    }
	  }
	})
