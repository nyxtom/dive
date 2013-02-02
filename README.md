# dive

Various standard scuba diving algorithms, formulas, calculations and device management.

## Getting Started
Install the module with: `npm install dive`

```javascript
var dive = require('dive');
dive.feetToMeters(); // 0.3048
dive.feetToMeters(33); // 10.0584
dive.dac(2500, 1300, 50); // 24
// calculate sac rate given dac rate and average depth in meters
dive.sac(24, 10); // 12.022841322028032
dive.rmv(25, 80, 3000); // 0.67
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## License
Copyright (c) 2013 Thomas Holloway  
Licensed under the MIT license.
