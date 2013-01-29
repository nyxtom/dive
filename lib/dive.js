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

    $self.metersToFeet = function (meters) {
        /// <summary>Calculates standard meters to feet calculation.</summary>
        /// <param name="meters" type="Number">Number of meters to convert.</param>
        /// <returns>The number in feet.</returns>
        if (!meters)
            return 3.2808;

        return meters * 3.2808;
    };

    $self.dac = function (psiIn, psiOut, runTime) {
        /// <summary>Calculates depth air consumption rate in psi/min.</summary>
        /// <param name="psiIn" type="Number">Pounds/square inch that one starts their dive with.</param>
        /// <param name="psiOut" type="Number">Pounds/square inch that one ends their dive with.</param>
        /// <param name="runTime" type="Number">The total time (in minutes) of a given dive.</param>

        return ((psiIn - psiOut) / runTime);
    };

}).call(this);
