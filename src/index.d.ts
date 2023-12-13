import { Query } from 'sift';
interface ConstructorOptions {
}
type Char = string;
interface BufferItem {
    value: Char;
    time: number;
}
interface ScannerOptions {
    pattern: RegExp;
    interval?: number;
    scan?: (str: string) => string | null;
    name?: string;
    flushed?: number;
    callback?: (str: string) => void;
    terminates?: boolean;
}
type OriginalEventHandler = (message: string | object | number) => void;
type EventHandler = (message: string | object | number) => OriginalEventHandler;
interface ScannerList {
    [key: string]: ScannerOptions[];
}
type ScannerOptionsList = ScannerOptions[];
export declare class CharacterScanner {
    options: ConstructorOptions;
    buffer: BufferItem[];
    largestInterval: number;
    times: number[];
    scanners: ScannerList;
    intervals: object;
    on?: ((type: string, criteria: Query<object> | OriginalEventHandler, handler?: OriginalEventHandler) => EventHandler);
    once?: ((type: string, criteria: Query<object> | OriginalEventHandler, handler?: OriginalEventHandler) => EventHandler);
    off?: ((type: string, handler?: EventHandler) => EventHandler);
    emit?: (type: string, message: string | object | number) => void;
    constructor(options?: ConstructorOptions);
    addScanner({ interval, name, pattern, scan, }: ScannerOptions): void;
    removeAllScanners(): void;
    allScanners(): ScannerOptionsList;
    scan(scanners?: ScannerOptionsList): void;
    input(value: string): void;
}
export {};
