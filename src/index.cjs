"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterScanner = void 0;
var extended_emitter_1 = require("extended-emitter");
var CharacterScanner = /** @class */ (function () {
    function CharacterScanner(options) {
        if (options === void 0) { options = {}; }
        this.options = {};
        this.buffer = [];
        this.largestInterval = 0;
        this.times = [];
        this.scanners = {};
        this.intervals = {};
        if (options)
            this.options = options;
        (new extended_emitter_1.Emitter()).onto(this);
    }
    CharacterScanner.prototype.addScanner = function (
    //_options:ScannerOptions|null
    _a) {
        var _b = _a.interval, interval = _b === void 0 ? 1000 : _b, name = _a.name, _c = _a.pattern, pattern = _c === void 0 ? /.*/ : _c, _d = _a.scan, scan = _d === void 0 ? function (str) {
            var match = str.match(this.pattern);
            if (match)
                return match[0];
            return null;
        } : _d;
        if (interval > this.largestInterval) {
            this.largestInterval = interval;
        }
        var intervalString = interval.toString();
        if (!this.scanners[intervalString]) {
            this.scanners[intervalString] = [];
        }
        this.scanners[interval].push({ interval: interval, pattern: pattern, scan: scan, name: name });
    };
    CharacterScanner.prototype.removeAllScanners = function () {
        Object.keys(this.intervals).forEach(function (interval) {
            clearInterval(interval);
        });
    };
    CharacterScanner.prototype.allScanners = function () {
        var keys = Object.keys(this.scanners);
        var results = [];
        for (var lcv = 0; lcv < keys.length; lcv++) {
            results = results.concat(this.scanners[keys[lcv]]);
        }
        return results;
    };
    CharacterScanner.prototype.scan = function (scanners) {
        var terminated = false;
        var now = Date.now();
        var scannerList = (scanners || this.allScanners());
        var _loop_1 = function (lcv) {
            var scanner = scannerList[lcv];
            var interval = (scanner.interval || 0);
            if (terminated)
                return { value: void 0 };
            var buffer = this_1.buffer.filter(function (item) {
                return (item.time + interval) >= now
                    && ((!scanner.flushed) || scanner.flushed < item.time);
            }).map(function (item) {
                return item.value;
            }).join('');
            var result = void 0;
            if (scanner.scan) {
                result = scanner.scan(buffer);
                if (result) {
                    scanner.flushed = now;
                    if (scanner.callback)
                        scanner.callback(result);
                    if (scanner.name && this_1.emit) {
                        this_1.emit(scanner.name, result);
                    }
                    if (scanner.terminates)
                        terminated = true;
                }
            }
        };
        var this_1 = this;
        for (var lcv = 0; lcv < scannerList.length; lcv++) {
            var state_1 = _loop_1(lcv);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    CharacterScanner.prototype.input = function (value) {
        var now = Date.now();
        var largest = this.largestInterval;
        this.buffer = this.buffer.filter(function (item) {
            return item.time + largest >= now;
        });
        this.buffer.push({
            value: value,
            time: now
        });
        this.scan();
    };
    return CharacterScanner;
}());
exports.CharacterScanner = CharacterScanner;
