# grunt-typescript-formatter [![NPM version](https://badge.fury.io/js/grunt-typescript-formatter.png)](http://badge.fury.io/js/grunt-typescript-formatter)

> A grunt plugin for [typescript-formatter](https://github.com/vvakame/typescript-formatter).

## Getting Started
This plugin requires [Grunt](http://gruntjs.com/) `~0.4.1`

	npm install grunt-typescript-formatter --save-dev

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

	grunt.loadNpmTasks('grunt-typescript-formatter');

## The "tsfmt" task

### Overview
In your project's Gruntfile, add a section named `typescript-formatter` to the data object passed into `grunt.initConfig()`.

	grunt.initConfig({
	  'typescript-formatter': {
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

A JSON configuration object passed into typescript-formatter.

### Usage Example

	grunt.initConfig({
	  'typescript-formatter': {
	    files: {
	      src: ['src/file1.ts', 'src/file2.ts']
	    }
	  }
	})
