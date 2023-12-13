import { Emitter } from 'extended-emitter';
import { Query } from 'sift';

interface ConstructorOptions{ }

type Char = string;

interface BufferItem{
    value : Char,
    time : number
}

interface ScannerOptions {
    pattern: RegExp;
    interval?: number;
    scan?: (str: string)=>string|null;
    name?: string;
    flushed?: number;
    callback?: (str: string)=>void;
    terminates?: boolean;
}

type OriginalEventHandler = (message:string|object|number)=> void;

type EventHandler = (message:string|object|number)=> OriginalEventHandler;

interface ScannerList {
    [key: string]: ScannerOptions[];
}

type ScannerOptionsList = ScannerOptions[];

export class CharacterScanner{
    public options: ConstructorOptions = {};
    public buffer: BufferItem[] = [];
    public largestInterval: number = 0;
    public times: number[] = [];
    public scanners: ScannerList = {};
    public intervals: object = {};
    public on?: 
        ((
            type: string, 
            criteria: Query<object> | OriginalEventHandler, 
            handler?: OriginalEventHandler
        ) => EventHandler);
    public once?: 
        ((
            type: string, 
            criteria: Query<object> | OriginalEventHandler, 
            handler?: OriginalEventHandler
        ) => EventHandler);
    public off?: 
        ((
            type: string, 
            handler?: EventHandler
        ) => EventHandler);
    public emit?: (type: string, message:string|object|number) => void;
    
    constructor(options:ConstructorOptions={}){
        if(options) this.options = options;
        (new Emitter()).onto(this);
    }
    
    addScanner(
        //_options:ScannerOptions|null
        {
            interval = 1000,
            name,
            pattern = /.*/,
            scan = function(this: ScannerOptions, str: string):string | null{
                const match = str.match(this.pattern);
                if(match) return match[0];
                return null;
            },
        }: ScannerOptions
    ):void{
        if(interval > this.largestInterval){
            this.largestInterval = interval;
        }
        const intervalString: string = interval.toString();
        if(!this.scanners[intervalString]){
            this.scanners[intervalString] = [];
        }
        this.scanners[interval].push({ interval, pattern, scan, name });
    }
    
    removeAllScanners():void{
        Object.keys(this.intervals).forEach((interval)=>{
            clearInterval(interval);
        });
    }
    
    allScanners(): ScannerOptionsList{
        const keys: string[] = Object.keys(this.scanners);
        let results: ScannerOptionsList = [];
        for(let lcv=0; lcv < keys.length; lcv++){
            results = results.concat(this.scanners[keys[lcv]]);
        }
        return results;
    }
    
    scan(scanners?: ScannerOptionsList):void{
        let terminated = false;
        const now = Date.now();
        const scannerList = (scanners || this.allScanners());
        for(let lcv=0; lcv < scannerList.length; lcv++){
            const scanner: ScannerOptions = scannerList[lcv];
            const interval = (scanner.interval || 0);
            if(terminated) return;
            const buffer = this.buffer.filter(function(item){
                return (item.time + interval) >= now
                    && ((!scanner.flushed) || scanner.flushed < item.time);
            }).map(function(item){ 
                return item.value; 
            }).join('');
            let result;
            if(scanner.scan){
                result = scanner.scan(buffer);
                if(result){
                    scanner.flushed = now;
                    if(scanner.callback) scanner.callback(result);
                    if(scanner.name && this.emit){
                        this.emit(scanner.name, result);
                    }
                    if(scanner.terminates) terminated = true;
                }
            }
        }
    }
    
    input(value: string){
        const now = Date.now();
        const largest = this.largestInterval;
        this.buffer = this.buffer.filter(function(item){
            return item.time + largest >= now;
        });
        this.buffer.push({
            value : value,
            time : now
        });
        this.scan();
    }
}