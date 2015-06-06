"use strict";

/**
 * Unsafe HTML is used on client-side and not sanitized on set.
 */

module.exports = {

  set: function (val) {

    // convert string values
    if (typeof val == "string") val = {raw: val};

    // return the data
    return {type: "html", val};
  },

  compare: function (oldVal, newVal, attributeName) {
    if (!oldVal || !newVal) return oldVal == newVal;
    return oldVal.raw == newVal.raw;
  },

  get: function (val) {
    return val.html || val.raw;
  },

  "default": function () {
    return {};
  }

};
