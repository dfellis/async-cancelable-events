var fs = require('fs');
var cr = require('complexity-report');
var isAsync = require('is-async');
var EventEmitter;

function bootstrap(test) {
    test.expect = test.expect || test.plan;
    test.done = test.done || test.end;
}

exports.getEventEmitter = function(ee) {
    EventEmitter = ee;
};

exports.simpleEvent = function(test) {
    bootstrap(test);
    test.expect(1);
    var emitter = new EventEmitter();
    emitter.on('hi', function() {
        test.ok(true, 'received the event');
        test.done();
    });
    emitter.emit('hi');
};

exports.cancelableEvent = function(test) {
    bootstrap(test);
    test.expect(2);
    var emitter = new EventEmitter();
    emitter.on('toCancel', function() {
        test.ok(true, 'received the event');
        return false;
    });
    emitter.emit('toCancel', function(result) {
        test.ok(result === false, 'informed to cancel the event');
        test.done();
    });
};

exports.asyncEventListener = function(test) {
    bootstrap(test);
    test.expect(3);
    var emitter = new EventEmitter();
    emitter.on('toAccept', function(callback) {
        test.ok(true, 'received the event');
        test.ok(callback instanceof Function, 'received a callback function');
        callback(true);
    });
    emitter.emit('toAccept', function(result) {
        test.ok(result, 'informed to continue the event');
        test.done();
    });
};

exports.forceListenerType = function(test) {
    bootstrap(test);
    test.expect(3);
    var emitter = new EventEmitter();
    emitter.onSync('toAccept', function(optionalValue) {
        test.ok(true, 'received the event');
        test.ok(!optionalValue, 'nothing passed into the optionalValue slot');
        // not returning false is the same as returning true
    });
    emitter.onAsync('toAccept', function(optionalValue, callback) {
        if(!callback) callback = optionalValue;
        test.ok(true, 'received the event');
        callback();
    });
    emitter.emit('toAccept', function(result) {
        test.ok(result, 'informed to continue the event');
        test.done();
    });
};
