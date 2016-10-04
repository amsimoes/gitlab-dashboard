# smartenv
store things about your environment and let them travel across modules

## Status
[![Build Status](https://travis-ci.org/pushrocks/smartenv.svg?branch=release)](https://travis-ci.org/pushrocks/smartenv)
[![Dependency Status](https://david-dm.org/pushrocks/smartenv.svg)](https://david-dm.org/pushrocks/smartenv)
[![devDependency Status](https://david-dm.org/pushrocks/smartenv/dev-status.svg)](https://david-dm.org/pushrocks/smartenv#info=devDependencies)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/smartenv/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/smartenv/master/dependencies/npm)
[![bitHound Overalll Score](https://www.bithound.io/github/pushrocks/smartenv/badges/score.svg)](https://www.bithound.io/github/pushrocks/smartenv)

## Install
Install the package through npm

```
npm install smartenv
```

## Usage

```javascript
var smartenv = require("smartenv");

smartenv.info(); //prints an output about your current environment and registered objects
smartenv.register({akey:"a text"},"somevalue"); // register a new object
smartenv.makeGlobal() // make smartenv available from gobal.smartenv
smartenv.get("somevalue").akey; // returns "a text"
smartenv.items.somevalue.akey; // also returns "a text"
```