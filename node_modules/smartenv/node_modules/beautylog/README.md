# beautylog
beautiful logging, TypeScript ready

## Status
[![Build Status](https://travis-ci.org/pushrocks/beautylog.svg?branch=v0.0.9)](https://travis-ci.org/pushrocks/beautylog)
[![Dependency Status](https://david-dm.org/pushrocks/beautylog.svg)](https://david-dm.org/pushrocks/beautylog)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/beautylog/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/beautylog/master/dependencies/npm)
[![bitHound Score](https://www.bithound.io/github/pushrocks/beautylog/badges/score.svg)](https://www.bithound.io/github/pushrocks/beautylog)
[![codecov](https://codecov.io/gh/pushrocks/beautylog/branch/master/graph/badge.svg)](https://codecov.io/gh/pushrocks/beautylog)

## Usage

```javascript
var beautylog = require("beautylog"); //for use in OS console environment AND browser console

beautylog.log("some log message"); // normal console log message
beautylog.info("some log message") // info console log message
beautylog.ok("some log message"); // ok console log message
beautylog.warn("some log message"); // warn console log message
beautylog.success("some success message"); // success console log message
beautylog.error("some error message"); // error console log message

// alternatively you can use a logType parameter
beautylog.log("some log message","normal");
beautylog.log("some success message","success");
beautylog.log("some error message","error");
/* ... and so on ... */
```
The plugin produces beautiful output like this:
![console.png](https://mediaserve.lossless.digital/github.com/pushrocks/beautylog/console.png)

### Code Highlighting



### Console Tables
beautylog allows displaying data in nice tables for better overview.

> **Note:** This only works only in nodejs for now.

There are different types of tables.

#### Custom

```javascript
var beautylog = require("beautylog");
var myTable = beautylog.table.new("custom",["Heading1".blue,"Heading2".blue,"Heading3".blue]); // type "custom"
myTable.push(["check 1","success"]); // adds a row the myTable
myTable.push(["check 2","error"]); // adds a row the myTable
myTable.push(["check 3","error"]); // adds a row the myTable
myTable.print(); //prints myTable to the console
```

#### Checks

```javascript
var beautylog = require("beautylog");
var myTable = beautylog.table.new("checks"); // type checks
myTable.push(["check 1","success"]); // adds a row the myTable
myTable.push(["check 2","error"]); // adds a row the myTable
myTable.push(["check 3","error"]); // adds a row the myTable
myTable.print(); //prints myTable to the console
```

The table from the code with type "checks" above looks like this:
![table.png](https://mediaserve.lossless.digital/github.com/pushrocks/beautylog/table.png)

