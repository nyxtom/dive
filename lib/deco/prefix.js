
(function () {
    // save a reference to the global object
    var root = this;

    // the top-level namespace. All public `dive` classes and modules will 
    // be attached to this. Exported for both CommonJS and the browser
    var dive, $self;
    if (typeof exports !== 'undefined') {
        dive = exports;
    } else {
        dive = root.dive || {};
    }

    $self = dive.deco = dive.deco || {};
