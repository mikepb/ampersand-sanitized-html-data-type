"use strict";

var assert = require("assert");
var dataType = require("../lib/unsafe");

describe("Unsafe HTML", function () {
  describe("set", function () {
    it("should accept a string", function () {
      assert.deepEqual(dataType.set("Hello World!"), {
        type: "html",
        val: {
          raw: "Hello World!"
        }
      });
    });

    it("should accept an HTML string", function () {
      assert.deepEqual(dataType.set("<script>Hello World!</script>"), {
        type: "html",
        val: {
          raw: "<script>Hello World!</script>"
        }
      });
    });

    it("should accept an object", function () {
      assert.deepEqual(dataType.set({
        raw: "Hello World!"
      }), {
        type: "html",
        val: {
          raw: "Hello World!"
        }
      });
    });

    it("should not touch a valid tagged object", function () {
      assert.deepEqual(dataType.set({
        raw: "Hello World!",
        html: "html",
        tag: "afudzOg9ZKjB0xB6cQyePOU7DtA"
      }), {
        type: "html",
        val: {
          raw: "Hello World!",
          html: "html",
          tag: "afudzOg9ZKjB0xB6cQyePOU7DtA"
        }
      });
    });

    it("should accept a mistagged object", function () {
      assert.deepEqual(dataType.set({
        raw: "Hello World!",
        html: "html",
        tag: "tag"
      }), {
        type: "html",
        val: {
          raw: "Hello World!",
          html: "html",
          tag: "tag"
        }
      });
    });

    it("should accept an HTML object", function () {
      assert.deepEqual(dataType.set({
        raw: "<script>Hello World!</script>"
      }), {
        type: "html",
        val: {
          raw: "<script>Hello World!</script>"
        }
      });
    });

    it("should accept a mistagged HTML object", function () {
      assert.deepEqual(dataType.set({
        raw: "<script>Hello World!</script>",
        html: "html",
        tag:  "tag"
      }), {
        type: "html",
        val: {
          raw: "<script>Hello World!</script>",
          html: "html",
          tag:  "tag"
        }
      });
    });

    it("should accept an HTML object with whitelisted element", function () {
      assert.deepEqual(dataType.set({
        raw: "<b><script>Hello World!</script></b>"
      }), {
        type: "html",
        val: {
          raw: "<b><script>Hello World!</script></b>"
        }
      });
    });
  });

  require("./common")(dataType);
});
