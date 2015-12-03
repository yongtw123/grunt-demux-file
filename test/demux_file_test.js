'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.demux_file = {
	setUp: function(done) {
		// setup here if necessary
		done();
	},
	basic: function(test) {
		test.expect(2);
		var actual = 'tmp/2test/fixtures/123',
			expected = 'test/expected/' + actual;
		test.ok(grunt.file.exists(actual), 'file exists.');
		test.equal(grunt.file.read(actual), grunt.file.read(expected), 'should be identical.');
		test.done();
	},
	expanded: function(test) {
		test.expect(2);
		var actual = 'tmp2/2123',
			expected = 'test/expected/' + actual;
		test.ok(grunt.file.exists(actual), 'file exists.');
		test.equal(grunt.file.read(actual), grunt.file.read(expected), 'should be identical.');
		test.done();
	},
	custom: function(test) {
		test.expect(2);
		var actual = 'tmp3/C/123',
			expected = 'test/expected/' + actual;
		test.ok(grunt.file.exists(actual), 'file exists.');
		test.equal(grunt.file.read(actual), grunt.file.read(expected), 'should be identical.');
		test.done();
	},
	custom2: function(test) {
		test.expect(2);
		var actual = 'tmp4/C/123',
			expected = 'test/expected/' + actual;
		test.ok(grunt.file.exists(actual), 'file exists.');
		test.equal(grunt.file.read(actual), grunt.file.read(expected), 'should be identical.');
		test.done();
	}
};