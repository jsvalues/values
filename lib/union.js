'use strict'

var isObject = require('is-extendable')
var upsert = require('./upsert')
var union = require('arr-union')
var get = require('get-value')

module.exports = function unionValue (obj, prop, value) {
  if (!isObject(obj)) {
    throw new TypeError('union-value expects 1st argument to be an object')
  }
  if (typeof prop !== 'string') {
    throw new TypeError('union-value expects `prop` to be a string')
  }

  var arr = arrayify(get(obj, prop, true) || [])
  upsert(obj, prop, union(arr, arrayify(value || [])))
  return obj
}

function arrayify (val) {
  return Array.isArray(val) ? val : [val]
}
