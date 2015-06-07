"use strict";

var assert = require("assert");
var sanitize = require("gumbo-sanitize");

var client = require("../client");
var unsafe = require("../lib/unsafe");

var server = require("../index");
var sanitized = require("../lib/sanitized");

describe("module", function () {
  describe("client export", function () {
    it("should export the unsafe data type", function () {
      assert.deepEqual(client, {
        dataTypes: {html: unsafe}
      });
    });
  });

  describe("node export", function () {
    it("should export the default sanitized data type", function () {
      assert.deepEqual(Object.keys(server), ["dataTypes"]);
      assert.deepEqual(Object.keys(server.dataTypes), ["html"]);
      assert.strictEqual(server.dataTypes.html.compare, unsafe.compare);
      assert.strictEqual(server.dataTypes.html.get, unsafe.get);
      assert.strictEqual(server.dataTypes.html.default, unsafe.default);
      assert(typeof server == "function");
    });
    require("./sanitized")("should use default sanitizer", server.dataTypes.html);
    require("./sanitized")("should use relaxed sanitizer",
      server(sanitize.RELAXED).dataTypes.html, true);
  });
});
