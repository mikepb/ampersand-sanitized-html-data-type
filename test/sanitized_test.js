"use strict";

const tag = 1;

var assert = require("assert");
var sanitize = require("gumbo-sanitize");
var sanitized = require("../lib/sanitized");

describe("Default Sanitized HTML", function () {
  var dataType = sanitized();
  require("./sanitized")("#set", dataType);
  require("./common")(dataType);
});

describe("Default Sanitized HTML with custom tag", function () {
  var customTag = Date.now();
  var dataType = sanitized(null, customTag);
  it("should sanitize mismatching tags on set", function () {
    assert.deepEqual(dataType.set({
      raw: "<script>Hello World!</script>",
      html: "html",
      tag: tag
    }), {
      type: "html",
      val: {
        raw: "<script>Hello World!</script>",
        html: "Hello World!",
        tag: customTag
      }
    });
  });
});

describe("Relaxed Sanitized HTML", function () {
  var dataType = sanitized(sanitize.RELAXED);
  require("./sanitized")("#set", dataType, true);
  require("./common")(dataType);
});

describe("Relaxed Sanitized HTML configured via string", function () {
  var dataType = sanitized("RELAXED");
  require("./sanitized")("#set", dataType, true);
  require("./common")(dataType);
});
