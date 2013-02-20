# dive

Various standard scuba diving algorithms, formulas, calculations and device management.

## Getting Started
Install the module with: `npm install dive`

```javascript
var dive = require('dive');
dive.feetToMeters(); // 0.3048
dive.feetToMeters(33); // 10.0584
dive.metersToFeet(10); // 3.28084

// check defaults or change them
dive.gravitySamples.current(); // 9.80665 m/s2
dive.gravitySamples.current(9.8);
dive.gravitySamples.current(); // 9.8 m/s2
dive.surfacePressureSamples.current(); // 1 bar
dive.surfacePressureSamples.current(1);
dive.liquidSamples.fresh.density(); // 1000 kg/m3 (1 ton of a m^3)
dive.liquidSamples.salt.density(); // 1030 kg/m3
dive.liquidSamples.mercury.density(); // 13595.1 kg/m3
dive.constants.vapourPressure.lungsBreathing.current(); // 0.056713577314554675 bars (commonly seen in buhlmann deco)
dive.constants.altitudePressure.current(); // 1 bar (for sea level)
dive.constants.altitudePressure.current(0.6600); // (approx. 3000 meters above sea level)
dive.constants.altitudePressure.current(1); // change back to default at sea-level

// calculate dac, sac and rmv rate
dive.dac(2500, 1300, 50); // 24 psi/min
dive.sac(24, 10); // 12.022841322028032 psi/min given 24 psi/min dac rate
dive.rmv(25, 80, 3000); // 0.67 cuft/min given 25 psi/min sac rate

// calculate various depth of 1 cubic meter volume of liquid in atm or bars
dive.depthInMetersToBars(10); // 2.0094000000000003 bar absolute
dive.depthInMetersToAtm(10); // 1.9962003454231434 atm
dive.atmToDepthInMeters(1); // 10.038141470180305 meters
dive.barToDepthInMeters(1); // 9.906875371507827 meters

// calculate depth meters for all calculations above but in fresh water
dive.depthInMetersToBars(10, true); // 1.98 bar absolute (1 above)
dive.depthInMetersToAtm(10, true); // 1.9671848013816926 atm absolute (1 above)
dive.atmToDepthInMeters(1, true); // 10.339285714285714 meters
dive.barToDepthInMeters(1, true); // 10.204081632653061 meters

// calculating partial pressure of a particular gas component mixture
// calculate partial pressure for gas mixture that is 79% nitrogen (N2) and 21% oxygen (O2)
// at 10 meters below sea level, what is partial pressure of each gas?
var p = dive.depthInMetersToBars(10); // 2.0094000000000003 bar absolute
dive.partialPressure(p, 0.79); // 1.5874260000000002 bar absolute
dive.partialPressure(p, 0.21); // 0.42197400000000007 bar absolute

// you can also use the helper function to calculate from depth in meters
dive.partialPressureAtDepth(10, 0.79); // 1.5874260000000002 bar absolute
dive.partialPressureAtDepth(10, 0.21); // 0.42197400000000007 bar absolute

// calculate partial pressures for above but in fresh water
dive.partialPressureAtDepth(10, 0.79, true); // 1.5642 bar absolute
dive.partialPressureAtDepth(10, 0.21, true); // 0.4158 bar absolute

// calculate water vapour pressure at a given temperature (degrees celcius)
// use the conversion tools to calculate in terms of bars
var mmHg = dive.waterVapourPressure(35.2); // 42.538675172399344 mmHg
var pascals = dive.mmHgToPascal(mmHg); // 5671.357731455468 Pascal
dive.pascalToBar(pascals); // 0.056713577314554675 bar
dive.waterVapourPressureInBars(35.2); // 0.056713577314554675 bar
// notice the 0.0567 bar above? we can plug that into the Buhlmann Decompression Algorithm

// calculate maximum operating depth using AIR (21% Oxygen) at 1.4 bars
dive.maxOperatingDepth(1.4, 0.21); // 56.10089197613197 meters
// calculate maximum operating depth using AIR (21% Oxygen) at 1.4 bars in fresh water
dive.maxOperatingDepth(1.4, 0.21, true); // 57.78391873541593 meters

// calculate the narcotic equivalent depth for breathing a gas mixture
// that is 12% Oxygen, 38% Nitrogen and 50% Helium at 100m
dive.equivNarcoticDepth(0.12, 0.38, 0.50, 100); // 56.882888936481194 meters air
dive.equivNarcoticDepth(0.12, 0.38, 0.50, 100, true); // 56.766365121623096 meters air (in fresh water)

// depth change in bars per minute (e.g. 0 to 10 meters in 30 seconds)
dive.depthChangeInBarsPerMinute(0, 10, 0.5); // 2.0201699 bars per minute (in salt water)
dive.depthChangeInBarsPerMinute(0, 10, 0.5, true); // 1.9613300000000002 bars per minute (in fresh water)

// gas rate in bars per minute (e.g. 0 to 10 meters in 30 seconds with 79% Nitrogen)
dive.gasRateInBarsPerMinute(0, 10, 0.5, 0.79); // 1.595934221 bars per minute (in salt water)
dive.gasRateInBarsPerMinute(0, 10, 0.5, 0.79,, true); // 1.5494507 bars per minute (in fresh water)

// gas breathing pressure in bars accounting for water vapour pressure in the lungs
// calculate the pressure at 10 meters breathing 79% N2
dive.gasPressureBreathingInBars(10, 0.79); // 0.7531633844215019 bars (in salt water)
dive.gasPressureBreathingInBars(10, 0.79, true); // 0.729921623921502 bars (in fresh water)

// instantaneous equation (exposed at 20 meters with AIR for 40 minutes)
var pGas = dive.gasPressureBreathingInBars(20, 0.79);
dive.instantaneousEquation(0.79, pGas, 40, 4.0); // 1.5940936555866738 bar

// buhlmann deco algorithm (*this needs review*)
var buhlmannDeco = dive.deco.buhlmann();
var newPlan = new buhlmannDeco.plan(buhlmannDeco.ZH16ATissues); // 1 abs pressure in fresh water
newPlan.addDepthChange(0, 25, 0.79, 0.0, 2);
newPlan.addFlat(25, 0.79, 0.0, 20);
newPlan.addDepthChange(25, 35, 0.79, 0.0, 2);
newPlan.addFlat(35, 0.79, 0.0, 20);
newPlan.addDepthChange(35, 10, 0.79, 0.0, 2); 
newPlan.calculateDecompression(0.79, 0.0); // [{'depth':3,'time':2}] 1 stop at 3 meters for 2 minutes
```

## TODO
* Need better test cases and validation for buhlmann implementation (needs review)

## Notice of Use
This library was built for pure research and educational purposes only.
Use at your own risk. I am not responsible for any injuries that may
occur as a result of experimenting with this software. Always
use a backup dive computer when experimenting with educational tools like
this and others that may implement various diving algorithms. It would be
nice if other dive companies followed by publishing their implementations
so the research and dive community could improve on it and ultimately
protect more people.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## License
Copyright (c) 2013 Thomas Holloway  
Licensed under the MIT license.
