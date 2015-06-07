"use strict";

var assert = require("assert");
var sanitize = require("gumbo-sanitize");
var sanitized = require("../lib/sanitized");

describe("Default Sanitized HTML", function () {
  var dataType = sanitized();
  require("./sanitized")("#set", dataType);
  require("./common")(dataType);
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
