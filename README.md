# grunt-demux-file

> Spawns multiple files from delimiter-separated values in source

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-demux-file --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-demux-file');
```

## The "demux_file" task

### Overview
In your project's Gruntfile, add a section named `demux_file` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  demux_file: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.prefixes
Type: `Array|Number`
Default value: none

An array of strings to differentiate the demultiplexed files.
A number that matches the number of 'streams' which can be demultiplexed is also allowed.

#### options.delimiters
Type: `Array`
Default value: `[ '[[[', ']]]' ]`

To mark the muxed string. 

#### options.separator
Type: `Array`
Default value: `,`

The separator to split the muxed string.

### Usage Examples

#### Basic
```
/* test/fixtures/test.txt */
[[[ 1,2,3 ]]]
```

```js
grunt.initConfig({
  demux_file: {
	  options: {
			prefixes: 3
		},
		basic: {
			src: ['test/fixtures/test.txt'],
			dest: 'tmp/'
		}
  }
});
```

```
/* tmp/0test/fixtures/test.txt */
1
/* tmp/1test/fixtures/test.txt */
2
/* tmp/2test/fixtures/test.txt */
3
```

#### Custom Options
```
/* test/fixtures/test.txt */
<<< 1 | 2 | 3 >>>
```

```js
grunt.initConfig({
  demux_file: {
	  options: {
			prefixes: 3 /*overridden*/
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
		}
  }
});
```

```
/* tmp3/A/test.txt */
1
/* tmp3/B/test.txt */
2
/* tmp3/C/test.txt */
3
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2015-12-03	v0.1.0	Initial release
* 2015-12-03	v0.1.2	`dest` resolve fix
