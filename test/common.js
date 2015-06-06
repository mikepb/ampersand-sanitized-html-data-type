"use strict";

var assert = require("assert");

module.exports = function (dataType) {
  describe("#compare", function () {
    it("should compare equal values", function () {
      assert(dataType.compare({
        raw: "Hello World!"
      }, {
        raw: "Hello World!"
      }, "value"))
    });

    it("should compare a sanitized and unsanitized values", function () {
      assert(dataType.compare({
        raw: "<script>Hello World!</script>",
        html: "Hello World!",
        tag: 1
      }, {
        raw: "<script>Hello World!</script>",
      }, "value"))
    });

    it("should compare unequal values", function () {
      assert(!dataType.compare({
        raw: "Hello World!"
      }, {
        raw: "Goodbye World!"
      }, "value"))
    });

    it("should compare unequal sanitized and unsanitized values", function () {
      assert(!dataType.compare({
        raw: "<script>Hello World!</script>",
        html: "Hello World!",
        tag: 1
      }, {
        raw: "<script>Goodbye World!</script>",
        html: "Goodbye World!",
        tag: 1
      }, "value"))
    });

    it("should compare values with different tags", function () {
      assert(dataType.compare({
        raw: "<script>Hello World!</script>",
        html: "Hello World!",
        tag: 1
      }, {
        raw: "<script>Hello World!</script>",
        html: "<script>Hello World!</script>",
        tag: -1
      }, "value"))
    });
  });

  describe("#get", function () {
    it("should get a raw value", function () {
      assert.equal(dataType.get({
        raw: "<script>Hello World!</script>"
      }), "<script>Hello World!</script>");
    });

    it("should get a sanitized value", function () {
      assert.equal(dataType.get({
        raw: "<script>Hello World!</script>",
        html: "Hello World!",
        tag: 1
      }), "Hello World!");
    });

    it("should get a mistagged sanitized value", function () {
      assert.equal(dataType.get({
        raw: "<script>Hello World!</script>",
        html: "Goodbye World!",
        tag: -1
      }), "Goodbye World!");
    });

    it("should get a sanitized value without the raw value", function () {
      assert.equal(dataType.get({
        html: "Goodbye World!"
      }), "Goodbye World!");
    });
  });

  describe("#default", function () {
    it("should return a default value", function () {
      var defaultValue = dataType.default();
      assert.deepEqual(defaultValue, {});
      assert.notStrictEqual(defaultValue, dataType.default());
    });
  });
};
