"use strict";

/**
 * Constants.
 */

var TAG = 1;

/**
 * Module dependencies.
 */

var sanitize = require("gumbo-sanitize");
var unsafe = require("./unsafe");

/**
 * Sanitized HTML is sanitized on set.
 */

module.exports = function (options) {

  // accept options as a string
  if (typeof options == "string") options = sanitize[options];

  // default to the BASIC options
  if (!options) options = sanitize.BASIC;

  return {

    set: function (val) {

      // convert string values
      if (typeof val == "string") val = {raw: val};

      // if we've already sanitized the html, just return it
      if (val.tag === TAG) return {type: "html", val: val};

      // sanitize the raw html
      var html = sanitize(val.raw, options);

      // set the sanitized html value if different from raw input
      if (html != val.raw) val.html = html;
      else delete val.html;

      // tag it for future reference
      val.tag = TAG;

      // return the data
      return {type: "html", val: val};
    },

    compare: unsafe.compare,
    get: unsafe.get,
    "default": unsafe["default"]

  };
};
