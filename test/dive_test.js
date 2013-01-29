var dive = require('../lib/dive.js');

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

exports['metersToFeet'] = {
    setUp: function(done) {
        done();
    },
    'no args': function(test) {
        test.expect(1);
        test.equal(dive.metersToFeet(), 3.2808, 'should be standard 1m -> 3.2808ft');
        test.done();
    },
    '1 arg': function(test) {
        test.expect(1);
        test.equal(dive.metersToFeet(2), (6.5616), 'should be standard 2m -> 2 * 3.2808ft');
        test.done();
    }
};

exports['dac'] = {
    setUp: function(done) {
        done();
    },
    'args': function(test) {
        test.expect(1);
        test.equal(dive.dac(2500, 1300, 50), 24, 'should be 24 psi/min')
        test.done();
    }
};
