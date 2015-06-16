"use strict";

var assert = require("assert");
var sanitize = require("gumbo-sanitize");
var sanitized = require("../lib/sanitized");

describe("Default Sanitized HTML", function () {
  var dataType = sanitized();
  require("./sanitized")("#set", dataType);
  require("./common")(dataType);
});

describe("Basic Sanitized HTML with out-of-order option keys", function () {
  var options = Object.keys(sanitize.BASIC).reverse().reduce(
    function (memo, key) {
      return memo[key] = sanitize.BASIC[key], memo;
    }, {});
  var dataType = sanitized();
  require("./sanitized")("#set", dataType);
  require("./common")(dataType);
});

describe("Default Sanitized HTML with custom secret", function () {
  var options = {secret: "xyzzy"};
  Object.keys(sanitize.BASIC).forEach(function (key) {
    options[key] = sanitize.BASIC[key];
  });
  var dataType = sanitized(options);
  it("should sanitize mismatching tags on set", function () {
    assert.deepEqual(dataType.set({
      raw: "<p><script>Hello World!</script></p>",
      html: "html",
      sign: "tag"
    }), {
      type: "html",
      val: {
        raw: "<p><script>Hello World!</script></p>",
        html: "<p>Hello World!</p>",
        sign: "wpvItwtoaq1uzN4K4eyXBAtIQWA"
      }
    });
  });
});

describe("Relaxed Sanitized HTML", function () {
  var dataType = sanitized(sanitize.RELAXED);
  require("./sanitized")("#set", dataType, true);
  require("./common")(dataType);
});

describe("Relaxed Sanitized HTML with out-of-order option keys", function () {
  var options = Object.keys(sanitize.RELAXED).reverse().reduce(
    function (memo, key) {
      return memo[key] = sanitize.RELAXED[key], memo;
    }, {});
  var dataType = sanitized(options);
  require("./sanitized")("#set", dataType, true);
  require("./common")(dataType);
});

describe("Relaxed Sanitized HTML configured via string", function () {
  var dataType = sanitized("RELAXED");
  require("./sanitized")("#set", dataType, true);
  require("./common")(dataType);
});
