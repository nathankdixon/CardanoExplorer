(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.invariant = factory());
})(this, (function () { 'use strict';

    var prefix = 'Invariant failed';
    function invariant(condition, message) {
        if (condition) {
            return;
        }
        var provided = typeof message === 'function' ? message() : message;
        var value = provided ? prefix + ": " + provided : prefix;
        throw new Error(value);
    }

    return invariant;

}));
