"use strict";

var assert = require("assert");

module.exports = function (dataType) {
  var sign = "8fL/sSup6xt6O+sXrbYs3RyqDjQ";

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
        sign: sign
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
        sign: sign
      }, {
        raw: "<script>Goodbye World!</script>",
        html: "Goodbye World!",
        sign: sign
      }, "value"))
    });

    it("should compare values with different tags", function () {
      assert(dataType.compare({
        raw: "<script>Hello World!</script>",
        html: "Hello World!",
        sign: sign
      }, {
        raw: "<script>Hello World!</script>",
        html: "<script>Hello World!</script>",
        sign: "-1"
      }, "value"))
    });

    it("should not croak on undefined", function () {
      assert(!dataType.compare(void 0, {
        raw: "Hello World!"
      }, "value"))
      assert(!dataType.compare({
        raw: "Hello World!"
      }, void 0, "value"))
      assert(dataType.compare(void 0, void 0, "value"))
    });
  });

  describe("#get", function () {
    it("should not get a raw value", function () {
      assert.equal(dataType.get({
        raw: "<script>Hello World!</script>"
      }), void 0);
    });

    it("should get a sanitized value", function () {
      assert.equal(dataType.get({
        raw: "<script>Hello World!</script>",
        html: "Hello World!",
        sign: sign
      }), "Hello World!");
    });

    it("should get a missigned sanitized value", function () {
      assert.equal(dataType.get({
        raw: "<script>Hello World!</script>",
        html: "Goodbye World!",
        sign: ""
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
