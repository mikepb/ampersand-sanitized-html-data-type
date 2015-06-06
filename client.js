"use strict";

/**
 * Export mixin with unsafe HTML data type.
 */

module.exports = {
  dataTypes: {
    html: require("./lib/unsafe")
  }
};
