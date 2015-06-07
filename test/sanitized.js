"use strict";

const tag = 1;

var assert = require("assert");

module.exports = function (description, dataType, relax) {
  describe(description, function () {
    it("should accept a string", function () {
      assert.deepEqual(dataType.set("Hello World!"), {
        type: "html",
        val: {
          raw: "Hello World!",
          tag: tag
        }
      });
    });

    it("should sanitize an HTML string", function () {
      assert.deepEqual(dataType.set("<script>Hello World!</script>"), {
        type: "html",
        val: {
          raw: "<script>Hello World!</script>",
          html: "Hello World!",
          tag: tag
        }
      });
    });

    it("should sanitize an object", function () {
      assert.deepEqual(dataType.set({
        raw: "Hello World!"
      }), {
        type: "html",
        val: {
          raw: "Hello World!",
          tag: tag
        }
      });
    });

    it("should not touch a valid tagged object", function () {
      assert.deepEqual(dataType.set({
        raw: "Hello World!",
        html: "html",
        tag: tag
      }), {
        type: "html",
        val: {
          raw: "Hello World!",
          html: "html",
          tag: tag
        }
      });
    });

    it("should sanitize a mistagged object", function () {
      assert.deepEqual(dataType.set({
        raw: "Hello World!",
        html: "html",
        tag: "tag"
      }), {
        type: "html",
        val: {
          raw: "Hello World!",
          tag: tag
        }
      });
    });

    it("should sanitize an HTML object", function () {
      assert.deepEqual(dataType.set({
        raw: "<script>Hello World!</script>"
      }), {
        type: "html",
        val: {
          raw: "<script>Hello World!</script>",
          html: "Hello World!",
          tag: tag
        }
      });
    });

    it("should sanitize a mistagged HTML object", function () {
      assert.deepEqual(dataType.set({
        raw: "<script>Hello World!</script>",
        html: "html",
        tag:  "tag"
      }), {
        type: "html",
        val: {
          raw: "<script>Hello World!</script>",
          html: "Hello World!",
          tag: tag
        }
      });
    });

    it("should sanitize an HTML object with whitelisted element", function () {
      assert.deepEqual(dataType.set({
        raw: "<b><script>Hello World!</script></b>"
      }), {
        type: "html",
        val: {
          raw: "<b><script>Hello World!</script></b>",
          html: "<b>Hello World!</b>",
          tag: tag
        }
      });
    });

    if (relax) {

      it("should sanitize HTML and keep the DIV", function () {
        assert.deepEqual(dataType.set({
          raw: "<div><b><script>Hello World!</script></b></div>"
        }), {
          type: "html",
          val: {
            raw: "<div><b><script>Hello World!</script></b></div>",
            html: "<div><b>Hello World!</b></div>",
            tag: tag
          }
        });
      });

    } else {

      it("should sanitize HTML and strip the DIV", function () {
        assert.deepEqual(dataType.set({
          raw: "<div><b><script>Hello World!</script></b></div>"
        }), {
          type: "html",
          val: {
            raw: "<div><b><script>Hello World!</script></b></div>",
            html: " <b>Hello World!</b> ",
            tag: tag
          }
        });
      });

    }
  });
};
