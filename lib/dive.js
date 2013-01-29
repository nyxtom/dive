/*
 * dive
 * https://github.com/nyxtom/dive
 *
 * Copyright (c) 2013 Thomas Holloway
 * Licensed under the MIT license.
 */

(function () {
    // Initial setup
    // --------------

    // save a reference to the global object
    var root = this;

    // the top-level namespace. All public `dive` classes and modules will 
    // be attached to this. Exported for both CommonJS and the browser
    var dive, $self;
    if (typeof exports !== 'undefined') {
        $self = dive = exports;
    } else {
        $self = dive = root.dive || {};
    }

    // current version of the library
    $self.VERSION = '0.1.0';

    // current liquid sample density in kilogram per cubic meters (kg/m3)
    $self.liquidSamples = {
        fresh: {
            density: function () {
                return $self.density(1000, 1); // 1000kg / m3 at 0C / 32F (standard conditions for measurements)
            }
        },
        salt: {
            density: function () {
                return $self.density(1030, 1); // 1000kg / m3 at 0C / 32F (standard conditions for measurements)
            }
        }
    };

    // current gravity sample rates in meters per second per second (m/s2)
    $self.gravitySamples = {
        earth: 9.8,
        _current: 9.8,
        current: function (_value) {
            if (typeof _value == 'Number') {
                $self.gravitySamples._current = _value;
            }
            return $self.gravitySamples._current;
        }
    };

    // current surface pressure measured in bar
    $self.surfacePressureSamples = {
        earth: 1,
        _current: 1,
        current: function (_value) {
            if (typeof _value == 'Number') {
                $self.surfacePressureSamples._current = _value;
            }
            return $self.surfacePressureSamples._current;
        }
    };

    $self.metersToFeet = function (meters) {
        /// <summary>Calculates standard meters to feet calculation.</summary>
        /// <param name="meters" type="Number">Number of meters to convert.</param>
        /// <returns>The number in feet.</returns>
        if (!meters)
            return 3.2808;

        return meters * 3.2808;
    };

    $self.atmToPascal = function (atm) {
        /// <summary>Calculates the internal pressure (measure of force per unit area) - often
        /// defined as one newton per square meter.</summary>
        /// <param name="atm" type="Number">The number of atmospheres (atm) to conver.</param>
        /// <returns>Pascal SI dervied unit of pressure from atm.</returns>
        
        // atm is represented as the force per unit area exerted on a surface by the weight of the 
        // air above that surface in the atmosphere. The unit of measurement on Earth is typically
        // 101325 pascals = 1 atm. 
        // 100000 pascals = 1 bar
        // 
        // On Jupiter (since there isn't technically a surface, the base is determined to be at about 10bars) or 
        // 10 times the surface pressure on earth. It's funny how easy it is to use bar since you can essentially 
        // say how much times the surface pressure on earth is X. Easy conversion.
        //
        // Interesting enough, according to http://en.wikipedia.org/wiki/Bar_(unit)#Definition_and_conversion
        // atm is a deprecated unit of measurement. Despite the fact that bars are not a standard unit of 
        // measurement, meterologists and weather reporters worldwide have long measured air pressure in millibars
        // as the values are convenient. After hPa (hectopascals) were setup, meterologists often use hPa which 
        // are numerically equivalent to millibars. (i.e. 1hPa = 1mbar = 100Pa).
        //
        // Given the case for Mars, which averages about 600 Pascals = 6hPa = 6mbar
        // That means that the surface pressure on mars is roughly 166 times weaker than 
        // the surface pressure on Earth. Given that Mars's gravity is roughly 3.724m/s2.
        // Which means if you had fresh water on Mars (1000kg/m3 accounting for density)
        // the weight density of water on mars would be 3724 N/m3. Given 600 Pascals = 600 N/m2.
        // You could dive (if fresh water existed on mars to a reasonanly depth), to reach the level
        // of pressure that you would experience typically at 10 meters here on Earth you would have to 
        // dive up to 26.745434948 meters or about 87 feet.
        //
        // (Please tell me if I'm calculating this wrong, it seems about accurate to me)
        //

        // See also: https://twitter.com/nyxtom/status/296157625123500032
        // Essentially, thoughts that pondered on how Jupiter's gravitational pull would 
        // affect the atmospheric pressure underwater for the moons surrounding it (that essentially made of ice and potentially 
        // other water based liquid forms). http://www.planetaryexploration.net/jupiter/io/tidal_heating.html

        // atm is essentially a deprecated unit of measurement
        if (!atm) {
            atm = 1;
        }

        // 100000 pascal = 1 bar = 0.986923267 atm
        // 1 atm = 101325 pascal = 1.01325 bar
        return $self.surfacePressureSamples.current() * 101325 * atm;
    };

    $self.density = function (weight, volume) {
        /// <summary>Calculates the liquid density of the mass for the given volume.</summary>
        /// <param name="weight" type="Number">The weight (in kilograms) of the given mass.</param>
        /// <param name="volume" type="Number">The volume of the given mass in (cubic meters m3).</param>
        /// <returns>Density of the mass</returns>

        return weight / volume;
    };

    $self.atmToDepthInMeters = function (atm, isFreshWater) {
        /// <summary>Calculates the depth (in meters) for the given atmosphere (atm).</summary>
        /// <param name="atm" type="Number">The number of atmospheres (atm) to convert.</param>
        /// <param name="isFreshWater" type="Boolean">True to calculate against the weight density of fresh water versus salt.</param>
        /// <returns>The depth (in meters) for the given number of atmospheres.</returns>

        /*
         * Liquid pressure is defined as: pgh (density of liquid x gravity at the surface x height).
         * or Pressure = weight density x depth
         *
         * Standard Weight Density: (kg/m3) at 32F or 0C
         *  Water (fresh): 1000 kg/m3
         *  Water (salt): 1030 kg/m3
         *
         * since there is always 1atm (above water)
         *  
         *  P = depth x weight density + 1P atm
         *  
         *  So to calculate the depth under liquid at which pressure is 2x atm,
         *
         *  depth x weight density + atm pressure (P) = 2 atm
         *  depth = 1P atm / weight density
         *
         *  weight density = density x gravity
         *  1 ATM = 101,325 Pa
         *  
         *  weight density of water (fresh) at 0C = 1000 kg/m3 x 9.8m/s2
         *
         *  depth = 101325 Pa / (1000 kg/m3 x 9.8m/s2)
         *  1 newton = kg*m/s2
         *  1 pascal = 1 newton / m2
         *
         *  
         *  101325 newton per m2 / (9800 kg*m/m3*s2)
         *  9800 kg*m/m3*s2 = 9800 newton per m3
         *
         *  101325 N/m2 / 9800 N/m3 = 10.339285714 meters
         */

        var liquidDensity;
        if (isFreshWater) {
            liquidDensity = $self.liquidSamples.fresh.density();
        } else {
            liquidDensity = $self.liquidSamples.salt.density();
        }

        if (!atm) {
            atm = 1;
        }

        var weightDensity = liquidDensity * $self.gravitySamples.current();
        var pressure = $self.atmToPascal(atm);
        return pressure / weightDensity;
    };

    $self.dac = function (psiIn, psiOut, runTime) {
        /// <summary>Calculates depth air consumption rate in psi/min.</summary>
        /// <param name="psiIn" type="Number">Pounds/square inch that one starts their dive with.</param>
        /// <param name="psiOut" type="Number">Pounds/square inch that one ends their dive with.</param>
        /// <param name="runTime" type="Number">The total time (in minutes) of a given dive.</param>
        /// <returns>The depth air consumption (DAC) rate in psi/min for the given psi in/out and dive time in minutes.</returns>

        return ((psiIn - psiOut) / runTime);
    };

    $self.sac = function (dac, avgDepth) {
        /// <summary>Calculates surface air consumption rate in psi/min based on DAC (depth air consumption) rate.</summary>
        /// <param name="dac" type="Number">Depth air consumption rate in psi/min.</param>
        /// <param name="avgDepth" type="Number">Average depth for length of dive.</param>
        /// <returns>The surface air consumption (SAC) rate in psi/min for the given DAC and average depth.</returns>
    };

}).call(this);
