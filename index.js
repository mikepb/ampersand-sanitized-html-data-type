"use strict";

/**
 * Module dependencies.
 */

var sanitized = require("./lib/sanitized");

/**
 * Export mixin with sanitized HTML data type.
 */

exports = module.exports = function (options) {
  return {dataTypes: {html: sanitized(options)}};
};

exports.dataTypes = {
  html: sanitized()
};
