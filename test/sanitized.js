"use strict";

var assert = require("assert");

module.exports = function (description, dataType, relax) {
  var plain = relax ? "Q56Z7fFu3cPAgqIE/RDJsF5TBxM" : "NLZg1jyBwFCUXuY6tYVbeV8iFbE";
  var inScript = relax ? "EmlsPYwsVDE9/GbxmzCoSa4MAnw" : "lI40Xao4exVwvrxU5LC3Xvb8zRE";
  var xssScript = relax ? "hB2rYcGUYik6MMvqUiiVP6VHw6g" : "gmCvLhbmq7hdX8KM+CeRb+tCnJg";
  var bScript = relax ? "o93/8IBlQIItpkLL5IiGEfsYUDI" : "ck41GDPYxc1vzY8F4H02T44sWYc";
  var inDiv = relax ? "vCGL+dclUBik/yF0YmtdImXBke8" : "9IFhgcq+Q6V8hoXt/KflGMo/kI8";

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
