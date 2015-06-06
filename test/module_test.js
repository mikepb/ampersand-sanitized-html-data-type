"use strict";

var assert = require("assert");

describe("module", function () {
  describe("client export", function () {
    it("should export the unsafe data type", function () {
      assert.deepEqual(require("../client"), {
        dataTypes: {html: require("../lib/unsafe")}
      });
    });
  });

  describe("node export", function () {
    it("should export the sanitized data type", function () {
      assert.deepEqual(require("../index"), {
        dataTypes: {html: require("../lib/sanitized")}
      });
    });
  });
});
