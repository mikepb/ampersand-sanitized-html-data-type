"use strict";

var assert = require("assert");

module.exports = function (description, dataType, relax) {
  var plain = relax ? "p479QZH1lFFrg9SLDboe+0iwesU" : "afudzOg9ZKjB0xB6cQyePOU7DtA";
  var inScript = relax ? "WuW2ho/uq22zqbHd17Lq5ey6roQ" : "F/JKN7XtwdlPoaopOCJlukRM0cs";
  var xssScript = relax ? "P8XCpbfYCO3uv9fz7+d3nhMGfDQ" : "er1I8ElTLEw8h2YuY0S9+faSOuQ";
  var bScript = relax ? "nYd71xo+3jAQM6UH/jJaY0eOZHE" : "yCxOQF/gf1pRcVJ6Vh1XpMcFgLQ";
  var inDiv = relax ? "ObZ+VO+/02POzy7yHq8x+83Mc2w" : "49mn6K70sR9CgBkZQpZdddiwXgo";

  describe(description, function () {
    it("should accept a string", function () {
      assert.deepEqual(dataType.set("Hello World!"), {
        type: "html",
        val: {
          raw: "Hello World!",
          html: "Hello World!",
          sign: plain
        }
      });
    });

    it("should sanitize an HTML string", function () {
      assert.deepEqual(dataType.set("<script>Hello World!</script>"), {
        type: "html",
        val: {
          raw: "<script>Hello World!</script>",
          html: "Hello World!",
          sign: inScript
        }
      });
    });

    it("should sanitize an HTML signature without content", function () {
      assert.deepEqual(dataType.set("<script src='http://xss-attack'></script>"), {
        type: "html",
        val: {
          raw: "<script src='http://xss-attack'></script>",
          html: "",
          sign: xssScript
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
          html: "Hello World!",
          sign: plain
        }
      });
    });

    it("should not touch a valid signed object", function () {
      assert.deepEqual(dataType.set({
        raw: "Hello World!",
        html: "html",
        sign: plain
      }), {
        type: "html",
        val: {
          raw: "Hello World!",
          html: "html",
          sign: plain
        }
      });
    });

    it("should sanitize a missigned object", function () {
      assert.deepEqual(dataType.set({
        raw: "Hello World!",
        html: "html",
        sign: "tag"
      }), {
        type: "html",
        val: {
          raw: "Hello World!",
          html: "Hello World!",
          sign: plain
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
          sign: inScript
        }
      });
    });

    it("should sanitize a missigned HTML object", function () {
      assert.deepEqual(dataType.set({
        raw: "<script>Hello World!</script>",
        html: "html",
        sign:  "tag"
      }), {
        type: "html",
        val: {
          raw: "<script>Hello World!</script>",
          html: "Hello World!",
          sign: inScript
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
          sign: bScript
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
            sign: inDiv
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
            sign: inDiv
          }
        });
      });

    }
  });
};
