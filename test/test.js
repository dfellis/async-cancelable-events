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
