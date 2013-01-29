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

        return meters * 3.2808;
    };

    $self.awesome = function () {
        /// <summary>Test awesome!</summary>
        return 'awesome';
    };

}).call(this);
