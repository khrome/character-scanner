import { Emitter } from 'extended-emitter';
export class CharacterScanner {
    options = {};
    buffer = [];
    largestInterval = 0;
    times = [];
    scanners = {};
    intervals = {};
    on;
    once;
    off;
    emit;
    constructor(options = {}) {
        if (options)
            this.options = options;
        (new Emitter()).onto(this);
    }
    addScanner(
    //_options:ScannerOptions|null
    { interval = 1000, name, pattern = /.*/, scan = function (str) {
        const match = str.match(this.pattern);
        if (match)
            return match[0];
        return null;
    }, }) {
        if (interval > this.largestInterval) {
            this.largestInterval = interval;
        }
        const intervalString = interval.toString();
        if (!this.scanners[intervalString]) {
            this.scanners[intervalString] = [];
        }
        this.scanners[interval].push({ interval, pattern, scan, name });
    }
    removeAllScanners() {
        Object.keys(this.intervals).forEach((interval) => {
            clearInterval(interval);
        });
    }
    allScanners() {
        const keys = Object.keys(this.scanners);
        let results = [];
        for (let lcv = 0; lcv < keys.length; lcv++) {
            results = results.concat(this.scanners[keys[lcv]]);
        }
        return results;
    }
    scan(scanners) {
        let terminated = false;
        const now = Date.now();
        const scannerList = (scanners || this.allScanners());
        for (let lcv = 0; lcv < scannerList.length; lcv++) {
            const scanner = scannerList[lcv];
            const interval = (scanner.interval || 0);
            if (terminated)
                return;
            const buffer = this.buffer.filter(function (item) {
                return (item.time + interval) >= now
                    && ((!scanner.flushed) || scanner.flushed < item.time);
            }).map(function (item) {
                return item.value;
            }).join('');
            let result;
            if (scanner.scan) {
                result = scanner.scan(buffer);
                if (result) {
                    scanner.flushed = now;
                    if (scanner.callback)
                        scanner.callback(result);
                    if (scanner.name && this.emit) {
                        this.emit(scanner.name, result);
                    }
                    if (scanner.terminates)
                        terminated = true;
                }
            }
        }
    }
    input(value) {
        const now = Date.now();
        const largest = this.largestInterval;
        this.buffer = this.buffer.filter(function (item) {
            return item.time + largest >= now;
        });
        this.buffer.push({
            value: value,
            time: now
        });
        this.scan();
    }
}
