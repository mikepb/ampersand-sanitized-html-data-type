"use strict";

var assert = require("assert");

module.exports = function (description, dataType, relax) {
  var plain = relax ? "rc02ZCuezMnpkA+3qssGnUDmmto" : "vKRymzZOZYWoshRBgrJ01qH4rY8";
  var inScript = relax ? "R2i7IAFAuB9QVxnvuCK0Xr4/hZE" : "379xCu0dmutbkDWBNK5KAIpZ0/Q";
  var xssScript = relax ? "pi8ugbcuncL4d/+QfoQcrWrtdPQ" : "NkrP4k00G4E1xRMo1CTVLIh/fzI";
  var bScript = relax ? "Tde+ZuljsgFIu1TKfaUF8mtJdAY" : "ah2Diy0Ate1E88Luti+kmgl9gGU";
  var inDiv = relax ? "Xawb0oXuz3dmmLyt0TAzGrb9/co" : "mebOqn4xIhGGmBwxIbE1a7moMCg";

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
