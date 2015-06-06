"use strict";

/**
 * Export mixin with sanitized HTML data type.
 */

module.exports = {
  dataTypes: {
    html: require("./lib/sanitized")
  }
};
