"use strict";

/**
 * Module dependencies.
 */

var crypto = require("crypto");
var sanitize = require("gumbo-sanitize");
var unsafe = require("./unsafe");

function replacer (key, value) {
  if (typeof value === "object" && !Array.isArray(value)) {
    return {
      object: Object.keys(value).sort().reduce(function (memo, key) {
        return memo.concat([key, value[key]]);
      }, [])
    };
  }
  return value;
}

/**
 * Sanitized HTML is sanitized on set.
 */

module.exports = function (options) {

  // accept options as a string
  if (typeof options == "string") options = sanitize[options];

  // default to the BASIC options
  if (!options) options = sanitize.BASIC;

  // hash tag
  var hash = crypto.createHash("sha1");
  hash.write(JSON.stringify(options, replacer));
  var secret = hash.digest();

  // remove secret from options
  if (options.secret != null) delete options.secret;

  return {

    set: function (val) {

      // convert string values
      if (typeof val == "string") val = {raw: val};

      // calculate value signature
      var hash = crypto.createHmac("sha1", secret);
      hash.write(val.raw || "");
      var sign = hash.digest("base64").replace(/=+$/, "");

      // if we've already sanitized the html, just return it
      if (val.sign === sign) return {type: "html", val: val};

      // sanitize the raw html
      val.html = sanitize(val.raw, options);

      // sign it for future reference
      val.sign = sign;

      // return the data
      return {type: "html", val: val};
    },

    compare: unsafe.compare,
    get: unsafe.get,
    "default": unsafe["default"]

  };
};
