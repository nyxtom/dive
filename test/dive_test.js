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

exports['feetToMeters'] = {
    setUp: function(done) {
        done();
    },
    'no args': function(test) {
        test.expect(1);
        test.equal(dive.feetToMeters(), 0.3048, 'should be standard 1m -> 3.2808ft');
        test.done();
    },
    '1 arg': function(test) {
        test.expect(1);
        test.equal(dive.feetToMeters(33), 10.0584, 'should be standard 33ft -> 10.0584m');
        test.done();
    }
};

exports['metersToFeet'] = {
    setUp: function(done) {
        done();
    },
    'no args': function(test) {
        test.expect(1);
        test.equal(dive.metersToFeet(), 3.28084, 'should be standard 1m -> 3.2808ft');
        test.done();
    },
    '1 arg': function(test) {
        test.expect(1);
        test.equal(dive.metersToFeet(10), 32.8084, 'should be standard 32.8084ft -> 10m');
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

exports['atmToDepthInMeters'] = {
    setUp: function(done) {
        done();
    },
    '10.03 meters': function(test) {
        test.expect(3);
        dive.gravitySamples.current(dive.gravitySamples.earth);
        dive.surfacePressureSamples.current(dive.surfacePressureSamples.earth);
        test.equal(dive.gravitySamples.current(), 9.80665, 'should be 9.8 m/s2 on earth as gravity default');
        test.equal(dive.surfacePressureSamples.current(), 1, 'should be 1 bar on earth as surface pressure default');
        var depth = Math.round(dive.atmToDepthInMeters() * 100) / 100;
        test.equal(depth, 10.03, 'should be 10.03 meters equal 1atm below sea level on earth in salt water');
        test.done();
    },
    '10.33 meters fresh water': function(test) {
        test.expect(3);
        dive.gravitySamples.current(dive.gravitySamples.earth);
        dive.surfacePressureSamples.current(dive.surfacePressureSamples.earth);
        test.equal(dive.gravitySamples.current(), 9.80665, 'should be 9.8 m/s2 on earth as gravity default');
        test.equal(dive.surfacePressureSamples.current(), 1, 'should be 1 bar on earth as surface pressure default');
        var depth = Math.round(dive.atmToDepthInMeters(1, true) * 100) / 100;
        test.equal(depth, 10.33, 'should be 10.33 meters equal 1atm below sea level on earth in fresh water');
        test.done();
    }
};

exports['barToDepthInMeters'] = {
    setUp: function(done) {
        done();
    },
    '9.9 meters': function(test) {
        test.expect(3);
        dive.gravitySamples.current(dive.gravitySamples.earth);
        dive.surfacePressureSamples.current(dive.surfacePressureSamples.earth);
        test.equal(dive.gravitySamples.current(), 9.80665, 'should be 9.8 m/s2 on earth as gravity default');
        test.equal(dive.surfacePressureSamples.current(), 1, 'should be 1 bar on earth as surface pressure default');
        var depth = Math.round(dive.barToDepthInMeters() * 100) / 100;
        test.equal(depth, 9.9, 'should be 9.9 meters equal 1 bars below sea level on earth in salt water');
        test.done();
    },
    '10.2 meters fresh': function(test) {
        test.expect(3);
        dive.gravitySamples.current(dive.gravitySamples.earth);
        dive.surfacePressureSamples.current(dive.surfacePressureSamples.earth);
        test.equal(dive.gravitySamples.current(), 9.80665, 'should be 9.8 m/s2 on earth as gravity default');
        test.equal(dive.surfacePressureSamples.current(), 1, 'should be 1 bar on earth as surface pressure default');
        var depth = Math.round(dive.barToDepthInMeters(1, true) * 100) / 100;
        test.equal(depth, 10.2, 'should be 10.2 meters equal 1 bars below sea level on earth in fresh');
        test.done();
    }
};

exports['depthInMetersToBars'] = {
    setUp: function(done) {
        done();
    },
    '10 meters': function(test) {
        test.expect(3);
        dive.gravitySamples.current(dive.gravitySamples.earth);
        dive.surfacePressureSamples.current(dive.surfacePressureSamples.earth);
        test.equal(dive.gravitySamples.current(), 9.80665, 'should be 9.8 m/s2 on earth as gravity default');
        test.equal(dive.surfacePressureSamples.current(), 1, 'should be 1 bar on earth as surface pressure default');
        var bars = Math.round(dive.depthInMetersToBars(10));
        test.equal(bars, 2, 'should be 10 meters equal 2 bars');
        test.done();
    }
};

exports['pascalToBar'] = {
    setUp: function(done) {
        done();
    },
    '100000 to 1 bar': function(test) {
        test.expect(1);
        test.equal(dive.pascalToBar(100000), 1, 'should be 1 bar to 100000 pascals');
        test.done();
    }
};

exports['barToPascal'] = {
    setUp: function(done) {
        done();
    },
    '100000 to 1 bar': function(test) {
        test.expect(1);
        test.equal(dive.barToPascal(1), 100000, 'should be 1 bar to 100000 pascals');
        test.done();
    }
};

exports['pascalToAtm'] = {
    setUp: function(done) {
        done();
    },
    '101325 to 1 atm': function(test) {
        test.expect(1);
        test.equal(dive.pascalToAtm(101325), 1, 'should be 1 atm to 101325 pascals');
        test.done();
    }
};

exports['atmToPascal'] = {
    setUp: function(done) {
        done();
    },
    '101325 to 1 atm': function(test) {
        test.expect(1);
        test.equal(dive.atmToPascal(1), 101325, 'should be 1 atm to 101325 pascals');
        test.done();
    }
};

exports['atmToBar'] = {
    setUp: function(done) {
        done();
    },
    '1.01325 to 1 atm': function(test) {
        test.expect(1);
        test.equal(dive.atmToBar(1), 1.01325, 'should be 1 atm to 1.01325 bar');
        test.done();
    }
};

exports['depthInMetersToAtm'] = {
    setUp: function(done) {
        done();
    },
    '10 meters': function(test) {
        test.expect(3);
        dive.gravitySamples.current(dive.gravitySamples.earth);
        dive.surfacePressureSamples.current(dive.surfacePressureSamples.earth);
        test.equal(dive.gravitySamples.current(), 9.80665, 'should be 9.8 m/s2 on earth as gravity default');
        test.equal(dive.surfacePressureSamples.current(), 1, 'should be 1 bar on earth as surface pressure default');
        var atm = Math.round(dive.depthInMetersToAtm(10));
        test.equal(atm, 2, 'should be 10 meters equal 1atm below sea level on earth');
        test.done();
    }
};

exports['sac'] = {
    setUp: function(done) {
        done();
    },
    '1 atm sac rate': function(test) {
        test.expect(2);
        var dac = dive.dac(2500, 1300, 50);
        test.equals(dac, 24, 'should be 24 psi/min');
        var sac = dive.sac(dac, 10);
        sac = Math.floor(sac);
        test.equals(sac, 12, 'should be 12 psi/min');
        test.done();
    }
};

exports['rmv'] = {
    setUp: function(done) {
        done();
    },
    'cubic feet per minute': function(test) {
        test.expect(1);
        var sac = 25; // 25 psi/min
        // diving with 80cubic feet working pressure 3000
        var rmv = Math.round(dive.rmv(sac, 80, 3000) * 100)/100;
        test.equals(rmv, 0.67, 'should be 0.67 cuft/min');
        test.done();
    }
};

exports['partialPressure'] = {
    setUp: function(done) {
        done();
    },
    'partial pressure in bar absolute for gas volume fraction': function(test) {
        test.expect(3);
        // diving with a tank that has 79% nitrogen and 21% oxygen
        // to 10 meters below sea level (or approximately 2 bar absolute)

        var barAbs = dive.depthInMetersToBars(10);
        test.equals(Math.round(barAbs), 2, '10 meters should be about 2 bar absolute');
        var fiN2 = 0.79;
        var fiO2 = 0.21;

        var ppN2 = Math.round(dive.partialPressure(barAbs, fiN2) * 100) / 100;
        var ppO2 = Math.round(dive.partialPressure(barAbs, fiO2) * 100) / 100;

        test.equals(ppN2, 1.59, '10 meters below with 79% nitrogen should make nitrogen at ~1.59 bar absolute');
        test.equals(ppO2, 0.42, '10 meters below with 21% nitrogen should make oxygen at 0.42 bar absolute');
        test.done();
    }
};

exports['partialPressureAtDepth'] = {
    setUp: function(done) {
        done();
    },
    'partial pressure in bar absolute for gas volume fraction': function(test) {
        test.expect(2);
        // diving with a tank that has 79% nitrogen and 21% oxygen
        // to 10 meters below sea level (or approximately 2 bar absolute)

        var fiN2 = 0.79;
        var fiO2 = 0.21;

        var ppN2 = Math.round(dive.partialPressureAtDepth(10, fiN2) * 100) / 100;
        var ppO2 = Math.round(dive.partialPressureAtDepth(10, fiO2) * 100) / 100;

        test.equals(ppN2, 1.59, '10 meters below with 79% nitrogen should make nitrogen at ~1.59 bar absolute');
        test.equals(ppO2, 0.42, '10 meters below with 21% nitrogen should make oxygen at 0.42 bar absolute');
        test.done();
    },
    'partial pressure in bar absolute for gas volume fraction in fresh': function(test) {
        test.expect(2);
        // diving with a tank that has 79% nitrogen and 21% oxygen
        // to 10 meters below sea level (or approximately 2 bar absolute)

        var fiN2 = 0.79;
        var fiO2 = 0.21;

        var ppN2 = Math.round(dive.partialPressureAtDepth(10, fiN2, true) * 100) / 100;
        var ppO2 = Math.round(dive.partialPressureAtDepth(10, fiO2, true) * 100) / 100;

        test.equals(ppN2, 1.56, '10 meters below with 79% nitrogen should make nitrogen at ~1.56 bar absolute in fresh water');
        test.equals(ppO2, 0.42, '10 meters below with 21% nitrogen should make oxygen at 0.42 bar absolute in fresh water');
        test.done();
    }
};

exports['mmHgToPascal'] = {
    setUp: function(done) {
        done();
    },
    'no args': function(test) {
        test.expect(1);
        var pascal = Math.round(dive.mmHgToPascal());
        test.equals(pascal, 133, '1 mmhg should equal about 133 pascal');
        test.done();
    },
    '1 arg': function(test) {
        test.expect(1);
        var pascal = Math.round(dive.mmHgToPascal(2));
        test.equals(pascal, 267, '2 mmhg should equal about 267 pascal');
        test.done();
    }
};

exports['waterVapourPressure'] = {
    setUp: function(done) {
        done();
    },
    'approximate pressure in lungs': function(test) {
        test.expect(2);
        var degreesCelcius = 35.2;
        var mmHg = dive.waterVapourPressure(degreesCelcius);
        test.equals(Math.round(mmHg), 43, '35.2 degrees celcius should put water vapour pressure at about 43 mmhg');
        var pascals = dive.mmHgToPascal(mmHg);
        var bars = dive.pascalToBar(pascals);
        test.equals((Math.round(bars * 10000) / 10000), 0.0567, 'approximate water vapour pressure in the lungs should be about 0.0537 bars');
        test.done();
    }
};

exports['maxOperatingDepth'] = {
    setUp: function(done) {
        done();
    },
    'salt water - max depth 1.4 bar with 21% O2': function(test) {
        test.expect(1);
        var meters = dive.maxOperatingDepth(1.4, 0.21);
        test.equals(Math.round(meters), 56, '1.4 bars at 21% oxygen should allow for about 56m MOD in salt water');
        test.done();
    },
    'fresh water - max depth 1.4 bar with 21% O2': function(test) {
        test.expect(1);
        var meters = dive.maxOperatingDepth(1.4, 0.21, true);
        test.equals(Math.round(meters), 58, '1.4 bars at 21% oxygen should allow for about 58m MOD in fresh water');
        test.done();
    }
};

exports['equivNarcoticDepth'] = {
    setUp: function(done) {
        done();
    },
    'salt water - equivalent narcotic depth 12% O2, 38% N2, 50% He at 100m': function(test) {
        test.expect(1);
        var meters = dive.equivNarcoticDepth(0.12,0.38,0.50,100);
        test.equals(Math.round(meters), 57, '12% O2/38% N2/50% He should have the same narcotic depth on air at x meters in salt water');
        test.done();
    },
    'fresh water - equivalent narcotic depth 12% O2, 38% N2, 50% He at 100m': function(test) {
        test.expect(1);
        var meters = dive.equivNarcoticDepth(0.12,0.38,0.50,100,true);
        test.equals(Math.round(meters), 57, '12% O2/38% N2/50% He should have the same narcotic depth on air at x meters in fresh water');
        test.done();
    },
};
