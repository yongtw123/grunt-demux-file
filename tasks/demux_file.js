/*
 * grunt-demux-file
 * https://github.com/yongtw123/grunt-demux-file
 *
 * Copyright (c) 2015 Yong Tseng
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('demux_file', 'Spawns multiple files from delimiter-separated values in source', function() {

        var _ = require('underscore'),
            chalk = require('chalk'),
            regexesc = require('escape-string-regexp');

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            prefixes: undefined, //an array is preferred, or a number designating length
            delimiters: ['[[[', ']]]'],
            separator: ','
        });

        
        // Insist on supplying prefixes
        if (_.isNumber(options.prefixes)) {
            grunt.log.writeln(chalk.yellow('No prefix supplied. Default to numbers.'));
            options.prefixes = _.range(parseInt(options.prefixes, 10)).map(function(v) {
                return v.toString();
            });
        } else if (_.isUndefined(options.prefixes)) {
            grunt.warn(chalk.red('Prefixes must be supplied!'));
        }

        
        // Setup regular expressions
        if (!_.isArray(options.delimiters) || options.delimiters.length !== 2) {
            grunt.warn(chalk.red('Delimiters must be an array of 2 strings.'));
        }
        options.delimiters = options.delimiters.map(function(delim) {
            return regexesc(delim);
        });
        options.delimiters.splice(1, 0, '(.*)');
        var delim = new RegExp(options.delimiters.join(''), 'g');


        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            var isExpanded = f.orig.expand || false;
            f.src.filter(function(filepath) {
                // Filter for existing files
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found. Ignore.');
                    return false;
                }
                return true;
            }).forEach(function(filepath) {
                var file = grunt.file.read(filepath);
                options.prefixes.forEach(function(prefix, index) {
                    var newfile = file.slice(),
                        dest = ((isExpanded) ? f.orig.dest : f.dest) + prefix + filepath;
                    newfile = newfile.replace(delim, function(match, p1) {
                        //there is only one capturing group
                        return p1.split(options.separator)[index].trim();			 
                    });
                    grunt.file.write(dest, newfile);
                    grunt.verbose.writeln('File "' + dest.green + '" created.');
                });
            });
        });
        
        
    });

};