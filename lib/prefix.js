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
    $self.VERSION = '0.1.1';

