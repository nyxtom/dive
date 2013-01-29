# dive

Various standard scuba diving algorithms, formulas, calculations and device management.

## Getting Started
Install the module with: `npm install dive`

```javascript
var dive = require('dive');
dive.metersToFeet(); // 3.2808
dive.metersToFeet(2); // 6.5616
dive.dac(2500, 1300, 50); // 24
dive.sac(24, 10); // 12.022841322028032
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## License
Copyright (c) 2013 Thomas Holloway  
Licensed under the MIT license.
