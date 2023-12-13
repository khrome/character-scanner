character-scanner / [Exports](modules.md)

character-scanner
============================
character-scanner.js
====================

[![NPM version](https://img.shields.io/npm/v/character-scanner.svg)]()
[![npm](https://img.shields.io/npm/dt/character-scanner.svg)]()
[![Travis](https://img.shields.io/travis/khrome/character-scanner.svg)]()

This is a scanner for scanning streams of characters (like you get from keyboard or "wedge" devices). It's built to be a common basis for wedge drivers, but could also be used directly.

Usage
-----

require the library
    
```javascript
import { CharacterScanner } from 'character-scanner';
// OR: import { CharacterScanner } from 'character-scanner/src/index.ts';
// OR: const { CharacterScanner } = require('character-scanner');
```

the simplest way is to just use a function to determine what we're looking for:

    const keyboardBuffer = new CharacterScanner();
    keyboardBuffer.addScanner(function(bufferString){
        //return truthy value whether bufferString is selected
    });
    

A more explicit way is to set it with options:

    keyboardBuffer.addScanner({
        name: 'email',
        interval: 5000,
        scan: function(bufferString){
            //return truthy value whether bufferString is selected
        },
        callback: function(value){
            //do stuff
        }
    });
    
And if you do provide a name you can then subscribe directly to events on the object instead of, or in addition to, the callback:

    keyboardBuffer.on('email', function(value){
        //do stuff
    })

Then you just wire the input stream to the scanner, by piping in characters:

    keyboardBuffer.input(chars);

Testing
-------

validate the typescript with
```bash
npm run ts
```

validate the module with
```bash
node ./src/index.mjs
```

validate the commonjs with
```bash
node ./src/index.cjs
```

Run the es module tests to test the typescript files
```bash
npm run ts-test
```

Run the es module tests to test the modules
```bash
npm run import-test
```
to run the same test inside the browser:

```bash
npm run browser-test
```
to run the same test headless in chrome:
```bash
npm run headless-browser-test
```

to run the same test inside docker:
```bash
npm run container-test
```

Run the commonjs tests against the `/dist` commonjs source (generated with the `build-commonjs` target).
```bash
npm run require-test
```

Development
-----------
All work is done in the .mjs files and will be transpiled on commit to commonjs and tested.

If the above tests pass, then attempt a commit which will generate .d.ts files alongside the `src` files and commonjs classes in `dist`
