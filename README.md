# Composite Symbol
> Get a unique JavaScript Symbol from a series of values.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Travis](https://img.shields.io/travis/Loilo/composite-symbol.svg?label=unix&logo=travis)](https://travis-ci.org/Loilo/composite-symbol)
[![AppVeyor](https://img.shields.io/appveyor/ci/Loilo/composite-symbol.svg?label=windows&logo=appveyor)](https://ci.appveyor.com/project/Loilo/composite-symbol)
[![npm](https://img.shields.io/npm/v/composite-symbol.svg)](https://npmjs.com/package/composite-symbol)

## The Problem
Since ES2015, we can use arbitrary objects as dictionay keys by using [Maps](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map).

However, sometimes we need to map data to not just one object but to multiple values, for example to attach data to relationships. JavaScript unfortunately has no built-in way for this.

## A Solution
This package provides a `getCompositeSymbol` function which takes an arbitrary (non-zero) number of values and returns a unique [Symbol](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol). Whenever the same series of values is passed to `getCompositeSymbol`, the same Symbol is going to be returned.

These Symbols allows us to construct things around them, e.g. we could use those unique symbols as keys in dictionaries.

### Example
We can use this feature to attach metadata to a relationship between two objects, without having to tack it onto the participating objects themselves:

```javascript
const getCompositeSymbol = require('composite-symbol')

// Imaginary models
const Person = require('person')
const { Prius, Ferrari } = require('cars')

// We want to store information about how people use their cars
const carRelationships = {}

// Say hi to John!
const john = new Person()

// John owns an old Toyota Prius
john.car = new Prius()

// John needs his car to drive to work everyday
carRelationships[getCompositeSymbol(john, 'car')] = 'drives to work daily'

// How about John buying a new car? He really earned it.
john.car = new Ferrari()

// But John still needs to drive to work everyday
carRelationships[getCompositeSymbol(john, 'car')] // === "drives to work daily"
```

## Installation
Install it from npm:

```bash
npm install --save composite-symbol
```

## Gotchas
* Order matters! `getCompositeSymbol(1, 2, 3)` will not return the same symbol as `getCompositeSymbol(3, 2, 1)`.
* Symbols are not unique across realms. That means, `getCompositeSymbol(1, 2, 3)` in browser window A will not return the same symbol as `getCompositeSymbol(1, 2, 3)` in browser window B.
* Symbols, as well as Maps (which this package uses in the background) are ES2015 features. This is not a problem in Node.js anymore, but if you want to use this package in the browser, be aware that it will not work in Internet Explorer.
