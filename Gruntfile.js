/*
 * grunt-demux-file
 * https://github.com/yongtw123/grunt-demux-file
 *
 * Copyright (c) 2015 Yong Tseng
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp*']
		},

		// Configuration to be run (and then tested).
		demux_file: {
			options: {
				prefixes: 3
			},
			basic: {
				src: ['test/fixtures/*'],
				dest: 'tmp/'
			},
			expanded: {
				files: [{
					expand: true,
					cwd: 'test/fixtures/',
					src: ['*'],
					dest: 'tmp2/'
				}]
			},
			custom: {
				options: {
					delimiters: ['<<<', '>>>'],
					separator: ' | ',
					prefixes: ['A/', 'B/', 'C/']
				},
				files: [{
					expand: true,
					cwd: 'test/fixtures/',
					src: ['*'],
					dest: 'tmp3/'
				}]
			},
			custom2: {
				options: {
					delimiters: ['<<<', '>>>'],
					separator: ' | ',
					prefixes: ['A/', 'B/', 'C/']
				},
				files: [{
					expand: true,
					flatten: true,
					filter: 'isFile',
					cwd: 'test/',
					src: ['fixtures/*'],
					dest: 'tmp4/'
				}]
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('debug', ['clean', 'demux_file']);
	grunt.registerTask('test', ['clean', 'demux_file', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};