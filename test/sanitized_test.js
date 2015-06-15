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
        sign: "GEBCuTY0LcMGJFPkWCg+zXmUmPw"
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
