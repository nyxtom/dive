# dive

Various standard scuba diving algorithms, formulas, calculations and device management.

## Getting Started
Install the module with: `npm install dive`

```javascript
var dive = require('dive');
dive.feetToMeters(); // 0.3048
dive.feetToMeters(33); // 10.0584
dive.metersToFeet(10); // 3.28084

// calculate dac, sac and rmv rate
dive.dac(2500, 1300, 50); // 24 psi/min
dive.sac(24, 10); // 12.022841322028032 psi/min given 24 psi/min dac rate
dive.rmv(25, 80, 3000); // 0.67 cuft/min given 25 psi/min sac rate

// calculate various depth of 1 cubic meter volume of liquid in atm or bars
dive.depthInMetersToBars(10); // 2.0094000000000003 bar absolute
dive.depthInMetersToAtm(10); // 1.9962003454231434 atm
dive.atmToDepthInMeters(1); // 10.038141470180305 meters
dive.barToDepthInMeters(1); // 9.906875371507827 meters

// calculate depth meters for all calculations above but in salt water
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
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## License
Copyright (c) 2013 Thomas Holloway  
Licensed under the MIT license.
