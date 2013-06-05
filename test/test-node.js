var jscoverage = require('jscoverage');
jscoverage.enableCoverage(true);
var coveralls = require('coveralls');
var EventEmitter = jscoverage.require(module, '../lib/async-cancelable-events');
var tests = require('./test');
tests.getEventEmitter(EventEmitter);

for(var key in tests) {
    if(key !== 'getEventEmitter') exports[key] = tests[key];
}

exports.jscoverage = function(test) {
	test.expect(1);
    jscoverage.coverageDetail();
    // Copied directly from jscoverage and edited, since getting at these values directly isn't possible
    var file;
    var tmp;
    var total;
    var touched;
    var n, len;
    if (typeof _$jscoverage === 'undefined') {
        return;
    }
    var lcov = "";
    for (var i in _$jscoverage) {
        file = i;
        lcov += "SF:" + file + "\n";
        tmp = _$jscoverage[i];
        if (typeof tmp === 'function' || tmp.length === undefined) continue;
        total = touched = 0;
        for (n = 0, len = tmp.length; n < len; n++) {
            if (tmp[n] !== undefined) {
                lcov += "DA:" + n + "," + tmp[n] + "\n";
                total ++;
                if (tmp[n] > 0)
                    touched ++;
            }
        }
        test.equal(total, touched, 'All lines of code exercised by the tests');
    }
    lcov += "end_of_record\n";
    if(process.env.TRAVIS) coveralls.handleInput(lcov);
    test.done();
};
