"use strict";

/**
 * Module dependencies.
 */

var unsafe = require("./lib/unsafe");

/**
 * Export mixin with unsafe HTML data type.
 */

exports = module.exports = function (options) {
  return {dataTypes: {html: unsafe}};
};

exports.dataTypes = {
  html: unsafe
};
